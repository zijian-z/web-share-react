import React from "react";
import {useParams} from "react-router-dom";

export default function User() {
    let { id } = useParams();

    return(
        <h2>{id}</h2>
    )
}
