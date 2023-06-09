import React from "react"
import PropTypes from "prop-types"
import Quality from "./quality"
import { useQuality } from "../../../hooks/useQuality"

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality()
    return (
        <>
            {!isLoading
                ? qualities.map((item) => <Quality key={item} id={item} />)
                : "Loading..."}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
