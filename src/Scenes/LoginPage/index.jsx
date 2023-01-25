
import React from "react"
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
  } from "@mui/material";

  import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../state/index";

import Form from "./form";

function LoginPage(){
    const dispatch=useDispatch();
    const isNonMobileScreens = useMediaQuery("min-width: 1000px");
    const theme=useTheme();
    const dark = theme?.palette?.neutral?.dark;
    // console.log(theme.palette.neutral.dark);
return(
    <Box display={"flex"} flexDirection="column">
    <Box
      textAlign={"center"}
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
    >
      <Typography
        fontWeight={"bold"}
        fontSize="32px"
        color={"primary"}
        display="inline"
      >
        Fakebook
      </Typography>
      <IconButton
        onClick={() => dispatch(setMode())}
        sx={{ fontSize: "25px", float: "right" }}
      >
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
    </Box>
    <Box
      width={isNonMobileScreens ? "50%" : "60%"}
      p="2rem"
      m="2rem auto"
      borderRadius={"1.5rem"}
      backgroundColor={theme.palette.background.alt}
    >
      <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
        Welcome to Fakebook, the social media for fake people!
      </Typography>
      <Form/>
      </Box>
      </Box>
)
}
export default LoginPage