import { NavbarDashboard } from "@/components/NavbarDashboard"
import  AdminDashboard  from "./homeDashboard";
import withAuthDashboard from "@/utils/withAuthDashboard";


 const homeDashboard = ()=>{
    return(
        <>
        <NavbarDashboard/>
        
        <AdminDashboard/>
        </>
    )
}
export default  withAuthDashboard  (homeDashboard);