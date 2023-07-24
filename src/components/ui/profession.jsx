import React from "react"
import { useSelector } from "react-redux"
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus
} from "../../store/professions"
import PropTypes from "prop-types"

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionsByIds(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())
    if (!isLoading) {
        return <p>{prof.name}</p>
    } else return "Loading..."
}
Profession.propTypes = {
    id: PropTypes.string
}
export default Profession
