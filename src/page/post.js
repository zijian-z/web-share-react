import React, {useState} from "react";
import {Textarea, Input, Button} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useHistory} from "react-router-dom";

export default function Post() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [comment, setComment] = useState("");
    const history = useHistory();
    const style = {
        width: "80%",
        marginLeft: "10%"
    }

    async function postLink() {
        try {
            const response = await instance.post("links/", {
                title: title,
                url: link,
                firstComment: comment
            });
            history.push("/detail/" + response.data.id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={style}>
            <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                variant="flushed"
                placeholder="标题" />
            <Input
                value={link}
                onChange={(event) => setLink(event.target.value)}
                variant="flushed"
                placeholder="链接" />
            <Textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="推荐理由"
                size="sm"
            />
            <Button
                onClick={() => postLink()}
                variant="ghost"
                colorScheme="pink">提交</Button>
        </div>
    )
}
