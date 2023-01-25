import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Friend } from "../../components/Friend";

import { setPost } from "../../state";
import Widgetwrapper from "../../components/Wrapper";
import FlexBetween from "../../components/FlexBetween";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    
  } from "@mui/icons-material";

// In my postWidget we are passing all the posts accordingly as profile page or if home page
// If it is home page  than it will getposts and if it is userpage than it will get only usersposts 
export const PostWidget = ({ postId,
    postUserId,
    name,
    description,
    location,
    picturepath,
    userPicturePath,
    likes,
    comments, }) => {
    // so now here we are gonna destructure all the values from posts and than we will pass some to friend component and now were ever would be the friend component is present it will get all the values when friend component render's i.e when we add someone as a friend from posts.
    const [isComments,  setIsComments] = useState(false)
    const dispatch = useDispatch();
    const LoggedInUserId = useSelector((state) => state.user._id);
    // const isLiked = Boolean(likes[LoggedInUserId]);
    // const likeCount = Object.keys(likes).length;
    const token = useSelector((state) => state.token);
    const {palette}=useTheme();
    const main = palette.neutral?.main;
    const primary = palette.primary?.main;

    const patchLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
            {
                method: "PATCH",
                headers: { Authorization: `Bearer${token}`,
                "Content-Type": "application/json",
             },
                body: JSON.stringify({ userId: LoggedInUserId })
            })
        const updatedPost = await response.json();
        dispatch(setPost({post:updatedPost}));
    }

    return (
        <Widgetwrapper m="2rem 0">
      {/* here we are passing each friend* profile images */}
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {/* other friends posts. */}
        {picturepath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${process.env.REACT_APP_API_URL}/uploads/${picturepath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
             <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {/* {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )} */}
              </IconButton>
              {/* <Typography>{likeCount}</Typography> */}
            </FlexBetween> 
  
         <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              {/* <Typography>{.length}</Typography> */}
            </FlexBetween> 
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {/* {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}  */}
      </Widgetwrapper>
    )
}