import React, {useEffect, useState} from "react";
import {ButtonGroup, Button, Avatar} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useHistory} from "react-router-dom";
import {least15String} from "../util/stringUtil";

export default function Navbar() {
    const [username, setUsername] = useState("");
    const [imageData, setImageData] = useState("");
    const history = useHistory();
    const style = {
        group: {
            marginBottom: "20px",
            marginTop: "5px"
        },
        avatar: {
            cursor: 'pointer'
        }

    }

    useEffect(() => {
        async function status() {
            try {
                const response = await instance.get('/users/status');
                setUsername(response.data);
                setImageData(least15String(response.data))
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
                <ButtonGroup style={style.group}>
                    <Button variant="link" onClick={() => history.push("/")}>首页</Button>
                    <Button variant="link" onClick={() => history.push("/login")}>登录</Button>
                    <Button variant="link" onClick={() => history.push("/register")}>注册</Button>
                </ButtonGroup>
            )
        } else {
            return(
                <ButtonGroup style={style.group}>
                    <Button variant="link" onClick={() => history.push("/")}>首页</Button>
                    <Button variant="link" onClick={() => history.push("/post")}>发表</Button>
                    <Button variant="link" onClick={() => history.push("/space")}>动态</Button>
                    <Avatar
                        style={style.avatar}
                        name={username}
                        src={'data:image/png;base64,' + imageData}
                        size="xs"
                        onClick={() => window.location.href = "/user/" + username}/>
                    <Button variant="link" onClick={() => logout()}>退出</Button>
                </ButtonGroup>
            )
        }
    }

    return (
        <Welcome />
    );
}
