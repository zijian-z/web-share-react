import React, {useState} from "react";
import {Input, Button, Text} from "@chakra-ui/react";
import instance from "../config/axiosConfig";

export default function ProfileUpdate(props) {
    const [bio, setBio] = useState(props.bio);
    const [email, setEmail] = useState(props.email);

    const style = {
        email: {
            marginTop: '10px'
        }
    }
    async function updateProfile() {
        try {
            const response = await instance.post('/profile/', {
                bio: bio,
                email: email,
                sex: 0
            });
            window.location.href = "/user/" + props.username;
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <Text size="md">个人简介</Text>
            <Input
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                variant="flushed"/>
            <Text size="md" style={style.email}>邮箱</Text>
            <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant="flushed"/>
            <Button
                variant="link"
                colorScheme="pink"
                onClick={() => updateProfile()}>提交</Button>
        </div>
    )
}
