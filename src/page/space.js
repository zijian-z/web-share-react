import {React, useEffect, useState} from "react";
import {useHistory, Link as RL} from "react-router-dom";
import instance from "../config/axiosConfig";
import {Text, Link, Button} from "@chakra-ui/react";

export default function Space() {
    const [notifies, setNotifies] = useState([]);
    const style = {
        marginBottom: '5px'
    }
    const history = useHistory();

    useEffect(() => {
        async function getUnread() {
            try {
                const response = await instance.post('/notify/');
                setNotifies(response.data.content);
            } catch (error) {
                console.log(error);
            }
        }
        getUnread();
    }, [])

    async function readNotify(notifyId) {
        try {
            const response = await instance.post('/notify/' + notifyId);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
            {
                notifies.map((item) =>
                    <Text key={item.id} style={style}>
                        <Link
                            to={'/user/' + item.comment.createUser.username}
                            color={item.unread ? "teal.500" : "gray.500"}
                            as={RL}
                            onClick={() => readNotify(item.id)}>
                            {item.comment.createUser.username}
                        </Link>
                        在
                        <Link
                            to={'/share/' + item.link.id}
                            color={item.unread ? "teal.500" : "gray.500"}
                            as={RL}
                            onClick={() => readNotify(item.id)}>
                            {item.link.title}
                        </Link>
                        中{item.notifyType === 'COMMENT_YOU' ? '评论' : '@'}了你：
                        <Link
                            to={'/share/' + item.link.id}
                            color={item.unread ? "teal.500" : "gray.500"}
                            as={RL}
                            onClick={() => readNotify(item.id)}>
                            {item.comment.content}
                        </Link>
                    </Text>
                )
            }
        </div>
    )
}
