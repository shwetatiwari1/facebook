import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    notification: null,
    clearNotification: null,
    posts: [],
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("no friends to show")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setClearNotification: (state, action) => {
            state.notification = null;
        },
        setPost: (state, action) => {

            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                    return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})
export const {
    setMode, setFriends, setLogin, setLogout, setPost, setPosts,
    setNotification,
    setClearNotification
} = authSlice.actions;
export default authSlice.reducer;