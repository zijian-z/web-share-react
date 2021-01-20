import React from "react";
import {Link, Box, Button, Divider, Text} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function LinkBox(props) {
    const history = useHistory();
    const style = {
        box: {
            marginBottom: '20px'
        },
        link: {
            fontSize: "20px"
        },
        button: {
            marginLeft: '20px',
            marginRight: '20px',
            cursor: 'pointer',
            fontSize: '13px'
        },
        a: {
            color: '#718096',
            fontSize: '13px'
        }
    }
    function goDetail() {
        history.push('/share/' + props.id);
    }

    return(
        <Box style={style.box}>
            <Link
                style={style.link}
                isExternal
                href={props.link}>{props.name}</Link>
            <Button
                onClick={() => goDetail()}
                style={style.button}
                variant="link">查看评论</Button>
            <a style={style.a}>{props.link}</a>
            <Divider />
        </Box>
    )
}
