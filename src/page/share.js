import React, {useEffect, useState} from "react";
import {Textarea, Text, Button, Divider, Link} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import {useParams, Link as RL} from "react-router-dom";

export default function Share() {
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [commentList, setCommentList] = useState([]);
    let { id } = useParams();

    const headStyle = {
        marginLeft: '5px'
    }

    const listStyle = {
        margin: "10px auto 10px 20px"
    }
    useEffect(() => {
        async function getDetail() {
            try {
                const response = await instance.get('/links/' + id);
                setTitle(response.data.title);
                setCommentList(response.data.comments);
            } catch (error) {
                console.error(error);
            }
        }
        getDetail();
    }, []);

    async function addComment() {
        if (comment !== '') {
            try {
                const response = await instance.post('/comments/', {
                    'linkId': id,
                    'content': comment
                });
                setCommentList([...commentList, response.data]);
                setComment("");
            } catch (error) {
                console.log(error);
            }
        }
    }


    function CommentListDiv() {
        if (commentList === undefined) {
            return (
                <h2>资源不存在</h2>
            )
        } else {
            return(
                <div>
                    <Text fontSize="xl" style={headStyle}>{title}</Text>
                    <Divider orientation="horizontal" />
                    <div>
                        {
                            commentList.map((item) =>
                                <Text style={listStyle} fontSize="md" key={item.id}>
                                    {item.content}
                                    &nbsp;by&nbsp;
                                    <Link color="teal.500" as={RL} to={'/user/' + item.createUser.username}>{item.createUser.username}</Link>
                                </Text>
                            )
                        }
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            <CommentListDiv />
            <Textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="您的评论"
                size="sm"
            />
            <Button
                onClick={() => addComment()}
                variant="ghost"
                colorScheme="teal">评论</Button>
            <Button
                onClick={() => setComment("")}
                variant="ghost"
                colorScheme="pink">清空</Button>
        </div>
    )
}
