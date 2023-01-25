import Dropzone from "react-dropzone";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  AddHomeWorkTwoTone,
} from "@mui/icons-material";
import Widgetwrapper from "../../components/Wrapper";
import UserImage from "../../components/UserImage";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setNotification, setPosts } from "../../state";
import FlexBetween from "../../components/FlexBetween";
export const MyPostWidgets = ({ picturepath }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [isimage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const { _id } = useSelector((state) => state.user)
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral?.mediumMain;
  const medium = palette.neutral?.medium;

  const handlePost = async () => {
    const formdata = new FormData();
    formdata.append("userId", _id);
    formdata.append("description", post);
    // console.log(_id);
    // console.log(post);
    if (image) {
      formdata.append("picture", image);
      formdata.append("picturePath", image.name)
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      // posting data in the form of key value pair and than assinging that data to body.
      body: formdata
    })
    const posts = await response.json();
    console.log("here are your post");
    console.log(posts);
    dispatch(setPosts({ posts }))
    if (posts) {
      console.log("post added ")
      dispatch(setNotification({
        messgae: "Post Added Successfully",
        type: "success",
        open: true,
      }))
    }
    setImage(null);
    setPost("");
  }
  return (
    <Widgetwrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturepath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral?.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isimage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary?.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isimage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": { cursor: "pointer" },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </Widgetwrapper>
  )
}