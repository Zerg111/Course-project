import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import { isEqual, orderBy } from "lodash"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import api from "../api"
import SearchStatus from "./searchStatus"
import UserTable from "./usersTable"
const Users = () => {
    const pageSize = 8

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data)
            setLoading(true)
        })
    }, [])
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })

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

    const handleSort = (item) => {
        setSortBy(item)
    }

    const filteredUsers = selectedProf
        ? users.filter((user) => isEqual(user.profession, selectedProf))
        : users
    const count = filteredUsers.length

    const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    if (loading) {
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
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    return "loading..."
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
