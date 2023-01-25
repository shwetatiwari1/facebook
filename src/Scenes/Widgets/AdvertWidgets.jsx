import Widgetwrapper from "../../components/Wrapper";
import FlexBetween from "../../components/FlexBetween";
import { Typography, useTheme } from "@mui/material";

const AdvertWidgets=()=>{
const {palette} =useTheme()
const dark = palette?.neutral?.dark;
const main = palette?.neutral?.main;
const medium = palette?.neutral?.medium;
return(
<Widgetwrapper>
    <FlexBetween>
    <Typography color={dark}  variant="h5" fontWeight="500">
    Sponsored
    </Typography>
    <Typography color={medium}>Create Ad</Typography>
    </FlexBetween>
    <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${process.env.REACT_APP_API_URL}/uploads/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
      <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5 rem">
      Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
</Widgetwrapper>
)
}
export default AdvertWidgets;
