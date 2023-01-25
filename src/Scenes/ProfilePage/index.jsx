import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar";

import { MyPostWidgets } from "../Widgets/MyPostWidgets";
import { UserWidget } from "../Widgets/UserWidget";
import { Friend } from "../../components/Friend";
import { FriendListWidget } from "../Widgets/FriendList";
import { PostsWidgets } from "../Widgets/PostsWidgets";
import { PostWidget } from "../Widgets/PostWidgets";


function ProfilePage() {

    const [user, setUser] = useState(null);
    // if we want to take any parameters from routes than we can destructre it and use useParams hook.
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const getUser = async () => {
        // here authorization has been done of the user id entered,so that not any one can access it
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, [])
    if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturepath={user?.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <MyPostWidgets picturepath={user?.picturePath} />
                        <Box m="2rem 0" />
                        <PostsWidgets userId={userId} isProfile />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default ProfilePage