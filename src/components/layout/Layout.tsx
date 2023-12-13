import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"

export function Layout(){
    return(
        <>
        <Header />
        {/**outlet onde vai renderizar as páginas */}
        <Outlet />
        </>
    )
}