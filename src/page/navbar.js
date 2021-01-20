import React, {useEffect, useState} from "react";
import {ButtonGroup, Button} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useHistory} from "react-router-dom";

export default function Navbar() {
    const [username, setUsername] = useState("");
    const history = useHistory();
    const style = {
        marginBottom: "20px",
        marginTop: "5px"
    }
    useEffect(() => {
        async function status() {
            try {
                const response = await instance.get('/users/status');
                setUsername(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        status();
    }, [])

    async function logout() {
        try {
            const response = await instance.post('/users/logout');
            if (response.data === 'logout.success') {
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    }

    function Welcome() {
        if (username === "") {
            return(
                <ButtonGroup style={style}>
                    <Button variant="link" onClick={() => history.push("/")}>首页</Button>
                    <Button variant="link" onClick={() => history.push("/login")}>登录</Button>
                    <Button variant="link" onClick={() => history.push("/register")}>注册</Button>
                </ButtonGroup>
            )
        } else {
            return(
                <ButtonGroup style={style}>
                    <Button variant="link" onClick={() => history.push("/")}>首页</Button>
                    <Button variant="link" onClick={() => history.push("/post")}>发表</Button>
                    <Button variant="link" onClick={() => history.push("/user/" + username)}>{username}</Button>
                    <Button variant="link" onClick={() => logout()}>退出</Button>
                </ButtonGroup>
            )
        }
    }

    return (
        <Welcome />
    );
}
