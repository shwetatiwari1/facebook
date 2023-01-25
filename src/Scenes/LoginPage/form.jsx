import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material"
import FlexBetween from "../../components/FlexBetween";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setNotification } from "../../state";
import Dropzone from 'react-dropzone'
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
})
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const intitialvalueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
}
const initialValuesLogin = {
  email: "",
  password: "",
};

 const Form = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("min-width:600px");
  const [pagetype, setPagetype] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pagetype === "login";
  const isRegister = pagetype === "register";
  const register = async (values, onSubmitProps) => {
    // form data sends biundle of data in form of arrays using xmlhttprequest or fetch to server.
    // or we can say in form of arrays,
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append("picture path", values.picture.name);
    const saveduserResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`,

      {
        method: "POST",
        body: formData
      }
    );
    const saveduser = await saveduserResponse.json();
    onSubmitProps.resetForm();
    if (saveduser) {
      setPagetype("login");
    };
  }

  const login = async (values, onSubmitProps) => {
    const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    }
    )
    const loggedIn = await loginResponse.json();
    if (loginResponse.status === 400) {
      dispatch(
        setNotification({
          message: loggedIn.msg,
          type: "error",
          open: true,
        }))
    }
    onSubmitProps.resetForm();
    if (loggedIn.user) {
      dispatch(setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
        
      }))
      dispatch(setNotification({
        message: `Welcome${loggedIn.user.firstName}`,
        type: "success",
        open: true,
      }))
      navigate("/home");
    }
  }
  const handleSubmitForm = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);

  }
  return (
    <>
      <Formik onSubmit={handleSubmitForm}
        initialValues={isLogin ? initialValuesLogin : intitialvalueRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}>
        {({

          values, errors, touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (<form onSubmit={handleSubmit}>

          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}>
            {isRegister &&
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={
                    Boolean(touched.lastName) && Boolean(errors.lastName)
                  }
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={
                    Boolean(touched.location) && Boolean(errors.location)
                  }
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box>
                  <Dropzone acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0])

                    }}
                  >
                    {({
                      getRootProps, getInputProps
                    }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}>

                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (

                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            {/* <EditOutlinedIcon /> */}
                          </FlexBetween>
                        )}

                      </Box>

                    )}
                  </Dropzone>

                </Box>
              </>
            }
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            <Button type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt
                , "&hover": { color: palette.primary.main }

              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <Typography onClick={() => {
              setPagetype(isLogin ? "register" : "login")
              resetForm();
            }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin ? "Dont Have account?signup here" : "Already have account?login here "}
            </Typography>
          </Box>
        </form>

        )}



      </Formik>
    </>
  )
}
export default Form