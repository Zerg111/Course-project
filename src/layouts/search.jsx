import React from "react"
import PropTypes from "prop-types"

const Search = ({ onSearch }) => {
    return (
        <div className="form-outline">
            <input
                className="form-control"
                placeholder="Search..."
                onChange={onSearch}
            />
        </div>
    )
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default Search
