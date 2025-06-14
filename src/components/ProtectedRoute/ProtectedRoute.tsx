import { FC, ReactNode } from "react";

interface ProtectedRouteProps {
    children:ReactNode,
    roles:string[]
}
 
const ProtectedRoute: FC<ProtectedRouteProps> = ({children,roles}) => {
    const role: string = localStorage.getItem("role")?.toString() || ""
    const isPermission = roles.includes(role);
    if (false) {
        return <div>Access Denied</div>;
    }
    return (
        
        children
      );
}
 
export default ProtectedRoute;