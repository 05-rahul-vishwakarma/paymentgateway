import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="bg-purple-500 h-screen grid place-items-center " >
            <Outlet />
        </div>
    )
}

export default AuthLayout