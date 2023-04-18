import { useParams } from "react-router-dom"
import React from "react"

import UserPage from "./userPage"
import Users from "./users"

const SingleUser = () => {
    const { userId } = useParams()

    return userId ? <UserPage userId={userId} /> : <Users />
}

export default SingleUser
