import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux"
import { setClearNotification } from "../state";

export default function Notification() {

    const dispatch = useDispatch();
    const notify = useSelector((state) => state.notification)
    const handleClose = (event, reason) => {
        if (reason === "clickAway") {
            return;
        }
        dispatch(setClearNotification())
    }
    // notification ka doubt 
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar onClose={handleClose()} autoHideDuration={3000} open={notify?.open}>
                {/* if it is of notify type than it will definitely get open */}
                <Alert
                    onClose={handleClose()} open={notify?.type} severity={notify?.type} sx={{ width: "100%" }}> {notify?.message}</Alert>
            </Snackbar>




        </Stack>
    )
}