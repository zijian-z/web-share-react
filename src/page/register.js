import React, {useEffect, useState} from "react";
import {Input, Button} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useHistory} from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");
    const history = useHistory();
    const style = {
        margin: "0 auto auto auto",
        maxWidth: "300px"
    }

    async function register() {
        try {
            const response = await instance.post("users/register", {
                username: username,
                password: password
            });
            if (response.data === 'user.register.success') {
                history.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div style={style}>
            <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                variant="flushed"
                placeholder="用户名" />
            <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                variant="flushed"
                placeholder="密码" />
            {/*<Input*/}
            {/*    value={password2}*/}
            {/*    onChange={(event) => setPassword2(event.target.value)}*/}
            {/*    type="password"*/}
            {/*    variant="flushed"*/}
            {/*    placeholder="再次输入密码" />*/}

            <Button
                variant="ghost"
                onClick={() => history.push("/login")}
                colorScheme="teal">去登录</Button>
            <Button
                variant="ghost"
                colorScheme="pink"
                onClick={() => register()}>注册</Button>
        </div>
    )
}
