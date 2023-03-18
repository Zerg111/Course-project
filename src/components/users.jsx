import React, { useState } from "react"
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userID) => {
    setUsers(users.filter((user) => user._id !== userID._id))
  }

  const renderUsersQualities = (user) => {
    return user.qualities.map((qualitiesId) => {
      return (
        <span
          key={qualitiesId._id}
          className={`badge bg-${qualitiesId.color} m-1`}
        >
          {qualitiesId.name}
        </span>
      )
    })
  }

  const renderUsersProfession = (userID) => {
    const professionId = userID.profession._id
    const professionName = userID.profession.name
    return (
      <>
        <span id={professionId}>{professionName}</span>
      </>
    )
  }

  const renderUsersCompletedMeetings = (userID) => {
    const completedMeetings = userID.completedMeetings
    return (
      <>
        <span>{completedMeetings}</span>
      </>
    )
  }

  const renderUsersRate = (userID) => {
    const rate = userID.rate
    return (
      <>
        <span>{rate}</span>
      </>
    )
  }

  const renderUsersInTable = () => {
    return users.map((user) => {
      return (
        <tr key={user._id} className={user._id}>
          <th>{user.name}</th>
          <td>{renderUsersQualities(user)}</td>
          <td>{renderUsersProfession(user)}</td>
          <td>{renderUsersCompletedMeetings(user)}</td>
          <td>{renderUsersRate(user)}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(user)
              }}
            >
              delete
            </button>
          </td>
        </tr>
      )
    })
  }

  const renderMessage = () => {
    return users.length !== 0 ? (
      <h1 className="badge bg-primary">
        {users.length} {renderPhrase(users.length)}
      </h1>
    ) : (
      <h1 className="badge bg-danger">Никто с тобой не тусанет</h1>
    )
  }

  const renderPhrase = (number) => {
    return number === 2 || number === 3 || number === 4
      ? "Человека тусанут с тобой сегодня"
      : "Человек тусанет с тобой сегодня"
  }

  return (
    <>
      {renderMessage()}

      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderUsersInTable()}</tbody>
        </table>
      )}
    </>
  )
}

export default Users
