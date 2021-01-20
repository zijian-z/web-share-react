import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from "./page/footer";
import Login from "./page/login";
import Register from "./page/register";
import Post from "./page/post";
import Navbar from "./page/navbar";
import New from "./page/new";
import Share from "./page/share";
import User from "./page/user";

function App() {
    const style = {
        width: "80%",
        marginLeft: "10%"
    }
    return (
        <ChakraProvider>
            <div style={style}>
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/post" component={Post} />
                        <Route path="/share/:id" component={Share} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/" component={New} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

export default App;
