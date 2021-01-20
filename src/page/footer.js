import React from "react";
import {Text, Link} from "@chakra-ui/react";

export default function Footer() {
    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"
    }
    return(
        <div style={style}>
            <Text>
                &copy;{new Date().getFullYear()} &nbsp;
                <Link color="teal.500" href="https://github.com/zijian-z" isExternal>
                   zijian-z
                </Link>
            </Text>
        </div>
    )
}
