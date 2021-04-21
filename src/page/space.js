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
                setNotifies(response.data);
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
                            to={'/user/' + item.username}
                            color={item.unread === 1 ? "teal.500" : "gray.500"}
                            as={RL}
                            onClick={() => readNotify(item.id)}>
                            {item.username}
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                            to={'/share/' + item.linkId}
                            color={item.unread ? "red.500" : "gray.500"}
                            as={RL}
                            onClick={() => readNotify(item.id)}>
                            {item.notifyType === 'COMMENT' ? '评论' : '@'}了你
                        </Link>
                    </Text>
                )
            }
        </div>
    )
}
