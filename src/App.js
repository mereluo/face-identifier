import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import "./App.css";

const initialState = {
    input: "",
    imageURL: "",
    box: [],
    route: "signin",
    isSignedIn: false,
    faces: 0,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
    },
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });
    };

    calculateFaceLocation = (data) => {
        const numFaces = data.outputs[0].data.regions.length;
        this.setState({ faces: numFaces });
        for (let i = 0; i < numFaces; i++) {
            const face = data.outputs[0].data.regions[i].region_info.bounding_box;
            const image = document.getElementById("inputimage");
            const width = Number(image.width);
            const height = Number(image.height);
            const singleBox = {
                leftCol: face.left_col * width,
                topRow: face.top_row * height,
                rightCol: width - face.right_col * width,
                bottomRow: height - face.bottom_row * height,
            };
            this.state.box.push(singleBox);
        }
        console.log("Faces: " + this.state.faces + "num: " + numFaces);
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        console.log("click");
        this.setState({ box: [] });
        this.setState({ imageURL: this.state.input }, () => {
            // http://localhost:8080/
            // https://face-identifier-api.onrender.com/
            fetch("http://localhost:8080/imageurl", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: this.state.input,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response) {
                        fetch("http://localhost:8080/image", {
                            method: "put",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                id: this.state.user.id,
                                numFaces: this.state.faces,
                            }),
                        })
                            .then((response) => response.json())
                            .then((count) => {
                                this.setState(Object.assign(this.state.user, { entries: count }));
                            })
                            .catch(console.log);
                    }
                    this.calculateFaceLocation(response);
                })
                .catch((error) => console.log("error", error));
        });
    };

    onRouteChange = (route) => {
        if (route === "signout") this.setState(initialState);
        else if (route === "home") this.setState({ isSignedIn: true });
        this.setState({ route: route });
    };

    render() {
        return (
            <div className="App">
                <ParticlesBg type="circle" bg={true} num={5} />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
                <Logo />
                {this.state.route === "home" ? (
                    <div>
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
                    </div>
                ) : this.state.route !== "register" ? (
                    <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                ) : (
                    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )}
            </div>
        );
    }
}

export default App;
