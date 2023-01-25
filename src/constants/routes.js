// import { LoginPage } from "../Scenes/LoginPage/LoginPage";
import LoginPage from "../Scenes/LoginPage"
import ProfilePage from "../Scenes/ProfilePage"
import { HomePage } from "../Scenes/HomePage"

export const routes=[
    {
        path:"/",
        component:LoginPage,
        layout:"app",
    },
    {
        path:"/home",
        component:HomePage,
        layout:"app",
    } ,
    {
        path:"/profile/:userId",
        component:ProfilePage,
        layout:"app",
    }  
]