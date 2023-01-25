
import { routes } from "./constants/routes"
import {Routes,Navigate,Route} from "react-router-dom"
import { Error } from "./Scenes/ErrorPage/Error"
import { useSelector } from "react-redux"
function Router(){
const isAuth=useSelector((state)=>state.token)
    return(
   <Routes>
{routes.map((route,index)=>{
    if(route.path==="/"){
        return(
            <Route exact key={index} path={route?.path} element={<route.component/>}/>
        )
    }else{
        return(
            // if it is authorised means token is present in the state.
            <Route exact key={index} path={route?.path} element={isAuth ?<route.component/>:<Navigate to={"/"}/>} />
        )
    }
})}
<Route path="*" element={<Error/>}></Route>
   </Routes>

    )
}
export default Router