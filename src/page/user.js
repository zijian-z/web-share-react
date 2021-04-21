import React, {useState, useEffect} from "react";
import {Input, Button, Text, Tag, TagLabel, TagLeftIcon} from "@chakra-ui/react";
import instance from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import ProfileUpdate from "../component/profileUpdate";
import {CheckCircleIcon, EmailIcon} from "@chakra-ui/icons";
import {checkStringNotNull} from "../util/stringUtil";

export default function User() {
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    let {id} = useParams();
    const [self, setSelf] = useState(false);
    const [update, setUpdate] = useState(false);

    const style = {
        email: {
            marginTop: '10px',
            marginBottom: '10px'
        }
    }

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await instance.get('/profile/' + id);
                setBio(response.data.bio);
                setEmail(response.data.email);
                setSelf(response.data.self);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile();
    }, [])

    return(
        <div>
            {
                self ?
                    <div>
                    {
                        update ?
                            <ProfileUpdate username={id} bio={bio} email={email}/>
                            :
                            <div>
                                <div>
                                    <Tag style={style.email} size="md" variant="subtle" colorScheme="cyan">
                                        <TagLeftIcon boxSize="12px" as={EmailIcon} />
                                        {
                                            checkStringNotNull(email) ?
                                                <TagLabel>{email}</TagLabel>
                                                :
                                                <TagLabel>未填</TagLabel>
                                        }
                                    </Tag>
                                </div>
                                <div>
                                    <Tag size="md" variant="subtle" colorScheme="cyan">
                                        <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
                                        {
                                            checkStringNotNull(bio) ?
                                                <TagLabel>{bio}</TagLabel>
                                                :
                                                <TagLabel>未填</TagLabel>
                                        }
                                    </Tag>
                                </div>
                                <div>
                                    <Button variant="link" colorScheme="pink" onClick={() => setUpdate(true)}>修改</Button>
                                </div>
                            </div>
                    }
                    </div>
                    :
                    <div>
                        <Tag size="md" variant="subtle" colorScheme="cyan">
                            <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
                            {
                                checkStringNotNull(bio) ?
                                    <TagLabel>{bio}</TagLabel>
                                    :
                                    <TagLabel>这个人还没有自我介绍</TagLabel>
                            }
                        </Tag>
                    </div>
            }
        </div>
    )
}
