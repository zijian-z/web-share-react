import React, {useEffect, useState} from "react";
import LinkBox from "../component/linkBox";
import instance from "../config/axiosConfig";

export default function Hot() {
    const [linkArray, setLinkArray] = useState([]);

    useEffect(() => {
        async function getLinks() {
            try {
                const response = await instance.get('/links/hot/');
                const linkArray = response.data;
                setLinkArray(linkArray);
            } catch (error) {
                console.error(error);
            }
        }
        getLinks();
    }, []);

    return (
        <div>
            {linkArray.map((item) => <LinkBox key={item.id} link={item.url} name={item.title} id={item.id}/>)}
        </div>
    );
}
