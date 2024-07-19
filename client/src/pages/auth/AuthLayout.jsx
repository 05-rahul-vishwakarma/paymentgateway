import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="bg-[#4d26d7] h-screen grid place-items-center " >
            <Outlet />
        </div>
    )
}

export default AuthLayout