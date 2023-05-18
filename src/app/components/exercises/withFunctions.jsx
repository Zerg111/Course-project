import React from "react"
import CardWrapper from "../common/Card"

const withFunctions = (Component) => (props) => {
    const isAuth = localStorage.getItem("auth")

    const onLogin = () => {
        localStorage.setItem("auth", "token")
    }

    const onLogOut = () => {
        localStorage.removeItem("auth")
    }

    return (
        <CardWrapper>
            <Component
                {...props}
                isAuth={isAuth}
                onLogin={onLogin}
                onLogOut={onLogOut}
            />
        </CardWrapper>
    )
}

export default withFunctions
