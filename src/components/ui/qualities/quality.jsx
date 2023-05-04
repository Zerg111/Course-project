import React from "react"
import PropTypes from "prop-types"
const Quality = ({ color, name, _id }) => {
    console.log(color)
    return <span className={"badge m-1 bg-" + color}>{name}</span>
}
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string
}

export default Quality
