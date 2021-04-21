import React, {useState} from "react";
import {Input, Button} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const style = {
        margin: "0 auto auto auto",
        maxWidth: "300px"
    }

    async function login() {
        const response = await instance.get('users/login', {
            params: {
                username: username,
                password: password
            }
        });
        if (response.data === 'user.login.success') {
            window.location.href = "/";
        }
    }

    return(
        <div style={style}>
            <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                variant="flushed"
                placeholder="用户名或邮箱" />
            <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                variant="flushed"
                placeholder="密码" />
            <Button
                onClick={() => history.push("/register")}
                variant="ghost"
                colorScheme="teal">去注册</Button>
            <Button
                variant="ghost"
                colorScheme="pink"
                onClick={() => login()}>登录</Button>
        </div>
    )
}
