import React from "react";
import { Box } from "@mui/system";
import Navbar from "../Navbar";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { UserWidget } from "../Widgets/UserWidget";
import { MyPostWidgets } from "../Widgets/MyPostWidgets";
import { PostsWidgets } from "../Widgets/PostsWidgets";
import { FriendListWidget } from "../Widgets/FriendList";
import AdvertWidgets from "../Widgets/AdvertWidgets";

export const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);


    return (
        <Box>
            <Navbar />
            <Box width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "26%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <UserWidget userId={_id} picturepath={picturePath} />

                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidgets picturepath={picturePath}></MyPostWidgets>
                    <PostsWidgets userId={_id}></PostsWidgets>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidgets></AdvertWidgets>
                        <Box mt="2rem 0">
                            <FriendListWidget userId={_id}></FriendListWidget>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}