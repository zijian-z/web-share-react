import React, {useEffect, useState} from "react";
import {InputGroup, Input, InputRightElement, Button} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useHistory} from "react-router-dom";
import { useToast } from "@chakra-ui/react"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [show, setShow] = useState(false);
    const toast = useToast();

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
                password: password,
                email: email,
                registerCode: code
            });
            if (response.data === 'user.register.success') {
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getRegisterMail() {
        try {
            const response = await instance.get('users/sendRegisterCode?email=' + email);
            if (response.data === 'mail.send.success') {
                toast({
                    title: "邮件已发送，请注意查收",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top"
                })
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant="flushed"
                placeholder="邮箱" />
            <InputGroup size="md">
                <Input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    variant="flushed"
                    placeholder="验证码"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => getRegisterMail()}>
                        获取
                    </Button>
                </InputRightElement>
            </InputGroup>
            <InputGroup size="md">
                <Input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={show ? "text" : "password"}
                    variant="flushed"
                    placeholder="密码"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                        {show ? "隐藏" : "显示"}
                    </Button>
                </InputRightElement>
            </InputGroup>
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
