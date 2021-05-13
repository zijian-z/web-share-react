import { useEffect, useState} from "react";
import React from "react";
import instance from "../config/axiosConfig";
import {
    Button, Badge, Select, useDisclosure, Drawer, Input, useToast,
    DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, FormLabel
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

export default function Read() {
    const [feeds, setFeeds] = useState({});
    const [folderName, setFolderName] = useState("");
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isOpen2, setIsOpen2] = useState(false);
    const [feedUrl, setFeedUrl] = useState("");
    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState("");
    const toast = useToast();

    const style = {
        // newFolder: {
        //     cursor: 'pointer',
        //     marginBottom: '10px',
        //     color: '#319795'
        // },
        buttons: {
            marginBottom: '20px'
        },
        list: {
            marginLeft: '10px',
            marginBottom: '20px'
        }
    }
    useEffect(() => {
        async function getFeeds() {
            const response = await instance.get("/feed/");
            let feedObject = {};
            let foldersArray = [];
            for(let i = 0; i < response.data.length; i++) {
                const key = response.data[i]['folderName'];
                if (feedObject[key] === undefined) {
                    feedObject[key] = [];
                    foldersArray.push(key);
                }
                if (response.data[i]['id'] !== null) {
                    feedObject[key].push(response.data[i]);
                }
            }
            setFeeds(feedObject);
            setFolders(foldersArray);
            setFolder(foldersArray[0]);
            // console.log(feedObject);
        }

        getFeeds();
    },[]);

    async function addFolder() {
        const response = await instance.post('/feed/folder?folderName=' + folderName);
        let copyFeeds = {...feeds};
        copyFeeds[folderName] = []
        setFeeds(copyFeeds);
        onClose();
    }

    function openFeedDrawer() {
        if (folders.length === 0) {
            toast({
                title: "请先添加文件夹",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            onOpen();
        }else{
            setIsOpen2(true);
        }
    }
    async function addFeed() {
        const response = await instance.post('/feed/', {
            feedUrl: feedUrl,
            folderName: folder
        });
        let copyFeeds = {...feeds};
        copyFeeds[folder].push(response.data);
        setFeeds(copyFeeds);
        setIsOpen2(false);
    }

    return (
        <div>
            <Drawer
                isOpen={isOpen}
                placement="top"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>新建文件夹</DrawerHeader>

                    <DrawerBody>
                        <Input value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            取消
                        </Button>
                        <Button colorScheme="blue" onClick={addFolder}>保存</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer
                isOpen={isOpen2}
                placement="top"
                onClose={() => setIsOpen2(false)}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>添加源</DrawerHeader>

                    <DrawerBody>
                        <FormLabel>链接</FormLabel>
                        <Input
                            value={feedUrl}
                            onChange={(event) => setFeedUrl(event.target.value)}/>
                        <FormLabel>文件夹</FormLabel>
                        <Select onChange={(e) => setFolder(e.target.value)}>
                            {
                                folders.map((item) => <option value={item}>{item}</option>)
                            }
                        </Select>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={() => setIsOpen2(false)}>
                            取消
                        </Button>
                        <Button colorScheme="blue" onClick={addFeed}>保存</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <div style={style.buttons}>
                <Button colorScheme="teal" size="xs" onClick={onOpen}>新建文件夹</Button>
                <Button colorScheme="pink" size="xs" onClick={openFeedDrawer}>添加源</Button>
            </div>

            {/*<Text style={style.newFolder} onClick={onOpen}>新建文件夹</Text>*/}
            {/*<Text style={style.newFolder} onClick={onOpen}>添加源</Text>*/}
            {/*<Divider />*/}
            {
                // ['a', 'b', 'c'].map((item) => <h1>{item}</h1>)
                Object.keys(feeds).map((key) =>
                    <div key={key}>
                        <Badge>{key}</Badge>
                        {/*<Text>添加</Text>*/}
                        <div style={style.list}>
                            {
                                feeds[key].map((item) =>
                                    <div key={item['id']}>
                                        <Button
                                            key={item['id']}
                                            variant="text"
                                            onClick={() => history.push('/content/'+item['id'])}
                                            color={item['unreadCount'] === 0 ? '#718096' : '#1a202c'}
                                        >
                                            {item['feedName']} {item['unreadCount'] === 0 ? '(0)' : '(' + item['unreadCount'] + ')'}
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </div>)
            }
        </div>
    )
}