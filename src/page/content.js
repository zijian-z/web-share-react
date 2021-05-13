import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import instance from "../config/axiosConfig";

export default function Content() {
    const [contents, setContents] = useState([]);

    let { id } = useParams();
    useEffect(() => {
        async function getContent() {
            const response = await instance.post('/feed/content/' + id);
            setContents(response.data);
            // console.log(response);
        }
        getContent();
    }, [])

    return(
        <div>
            {
                contents.map((item) =>
                    <div>
                        {item['title']}
                        {/*<div dangerouslySetInnerHTML={{__html: item['description']}} />*/}
                    </div>
                )
            }
        </div>
    )
}