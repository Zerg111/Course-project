import { React, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"

import api from "../api"

import Qualitie from "./qualitie"

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data)
            setLoading(false)
        })
    }, [userId])

    const content =
        !user || loading ? <h2>Loading...</h2> : <View user={user} />

    return <>{content}</>
}

const View = ({ user }) => {
    const { name, profession, qualities, completedMeetings, rate } = user
    const history = useHistory()

    return (
        <>
            <div>
                <h3>
                    <span>
                        Имя: <b>{name}</b>
                    </span>
                </h3>
                <h4>
                    <span>
                        Профессия: <b>{profession.name}</b>
                    </span>
                </h4>
                <h6>
                    {qualities.map((item) => (
                        <Qualitie key={item._id} {...item} />
                    ))}
                </h6>
                <h5>
                    <span>
                        Встретился, раз: <b>{completedMeetings}</b>
                    </span>
                </h5>
                <h3>
                    <span>
                        Оценка: <b>{rate}</b>
                    </span>
                </h3>
            </div>

            <button
                className="btn btn-primary"
                onClick={() => {
                    history.replace("/users")
                }}
            >
                Все пользователи
            </button>
        </>
    )
}

UserPage.propTypes = {
    userId: PropTypes.string
}

View.propTypes = {
    user: PropTypes.string
}

export default UserPage
