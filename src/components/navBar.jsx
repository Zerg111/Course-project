import { NavLink } from "react-router-dom"
import React from "react"

const NavBar = () => {
    const navLinkClass = () => (isActive) =>
        "nav-link fw-bold" + (isActive ? " bg-primary text-white" : "")

    return (
        <ul className="nav mb-3">
            <li className="nav-item">
                <NavLink exact to="/" className={navLinkClass()}>
                    Main Page
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" className={navLinkClass()}>
                    Login Page
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/users" className={navLinkClass()}>
                    Users Page
                </NavLink>
            </li>
        </ul>
    )
}

export default NavBar
