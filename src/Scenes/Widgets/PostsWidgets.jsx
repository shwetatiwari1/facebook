
import { RepeatOneSharp } from "@mui/icons-material"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import { PostWidget } from "./PostWidgets"
export const PostsWidgets = ({ userId, isProfile = false }) => {

    const posts = useSelector((state) => state.posts)
    console.log("here")
    console.log(posts);
    const token = useSelector((state) => state.token)
    console.log(token)
    const dispatch = useDispatch();
    // const getPosts = async () => {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await response.json();
    //     dispatch(setPosts({ posts: data }));
    // };
    const getPosts = async () => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json();

        dispatch(setPosts({ posts: data }))
        // console.log(data);
    }
    // if we click on users profile than only  users posts would be visible.

    const getUserPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data }))
    }
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [])
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        // so finally here was the mistake i was passing caps P which was wrong bcz i had took picturepath as a key argument and not picturePath.
                        picturepath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )

}