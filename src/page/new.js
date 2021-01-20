import React, {useEffect, useState} from "react";
import LinkBox from "../component/linkBox";
import instance from "../config/axiosConfig";

export default function New() {
    const [linkArray, setLinkArray] = useState([]);

    useEffect(() => {
        async function getLinks() {
            try {
                const response = await instance.get('/links/');
                const linkArray = response.data.content;
                setLinkArray(linkArray);
            } catch (error) {
                console.error(error);
            }
        }
        getLinks();
    }, []);

    return (
        <div>
            {linkArray.map((item) => <LinkBox key={item.id} link={item.uri} name={item.title} id={item.id}/>)}
        </div>
    );
}
