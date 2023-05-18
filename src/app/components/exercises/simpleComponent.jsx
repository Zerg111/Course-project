import React, { useState } from "react"
import PropTypes from "prop-types"

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    const [auth, setAuth] = useState(isAuth)

    const handleClick = () => {
        auth ? onLogin() : onLogOut()
        setAuth((prevState) => !prevState)
    }

    return (
        <button className="btn btn-primary" onClick={handleClick}>
            {auth ? "Войти" : "Выйти из системы"}
        </button>
    )
}

SimpleComponent.propTypes = {
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.bool
}

export default SimpleComponent
