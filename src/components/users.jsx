import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import { isEqual } from "lodash"
import User from "./user"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import api from "../api"
import SearchStatus from "./searchStatus"
const Users = ({ users, ...rest }) => {
    const pageSize = 2
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf
        ? users.filter((user) => isEqual(user.profession, selectedProf))
        : users
    const count = filteredUsers.length
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex jystify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
