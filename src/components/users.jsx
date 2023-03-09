import React, { useState } from "react"
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [usersLenght, setUsersLenght] = useState(api.users.fetchAll().length)

  const handleDelete = (userID) => {
    const buttonUserId = userID._id
    const trMas = document.getElementsByClassName(buttonUserId)
    const tr = trMas[0]
    setUsersLenght((el) => el - 1)
    tr.remove()
  }

  const renderPhrase = (number) => {
    return number === 2 || number === 3 || number === 4
      ? "Человека тусанут с тобой сегодня"
      : "Человек тусанет с тобой сегодня"
  }

  const setUsersQualities = (userID) => {
    return userID.qualities.map((qualitiesId) => {
      const qualitiesName = qualitiesId.name
      let qualitiesClassName = ""

      qualitiesName === "Нудила" &&
        (qualitiesClassName = "badge bg-primary m-1")

      qualitiesName === "Странный" &&
        (qualitiesClassName = "badge bg-secondary m-1")

      qualitiesName === "Троль" && (qualitiesClassName = "badge bg-success m-1")

      qualitiesName === "Алкоголик" &&
        (qualitiesClassName = "badge bg-danger m-1")

      qualitiesName === "Красавчик" &&
        (qualitiesClassName = "badge bg-info m-1")

      qualitiesName === "Неуверенный" &&
        (qualitiesClassName = "badge bg-dark m-1")

      return <>{<span className={qualitiesClassName}>{qualitiesName}</span>}</>
    })
  }

  const setUsersProfession = (userID) => {
    const professionId = userID.profession._id
    const professionName = userID.profession.name
    return (
      <>
        <span id={professionId}>{professionName}</span>
      </>
    )
  }

  const setUsersCompletedMeetings = (userID) => {
    const completedMeetings = userID.completedMeetings
    return (
      <>
        <span>{completedMeetings}</span>
      </>
    )
  }

  const setUsersRate = (userID) => {
    const rate = userID.rate
    return (
      <>
        <span>{rate}</span>
      </>
    )
  }

  const setUsersInTable = () => {
    return users.map((usersID) => {
      return (
        <>
          <tr className={usersID._id}>
            <th>{usersID.name}</th>
            <td>{setUsersQualities(usersID)}</td>
            <td>{setUsersProfession(usersID)}</td>
            <td>{setUsersCompletedMeetings(usersID)}</td>
            <td>{setUsersRate(usersID)}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(usersID)
                }}
              >
                delete
              </button>
            </td>
          </tr>
        </>
      )
    })
  }

  const handleMessage = () => {
    return usersLenght !== 0 ? (
      <>
        <h1 className="badge bg-primary">
          {usersLenght} {renderPhrase(usersLenght)}
        </h1>
      </>
    ) : (
      setRedMessage()
    )
  }

  const setRedMessage = () => {
    const tableMas = document.getElementsByClassName("table")
    const table = tableMas[0]
    table.classList.add("d-none")
    return (
      <>
        <div>
          <h1 className="badge bg-danger">Никто с тобой не тусанет</h1>
        </div>
      </>
    )
  }

  const setTable = () => {
    return (
      <>
        {handleMessage()}

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
          <tbody>{setUsersInTable()}</tbody>
        </table>
      </>
    )
  }
  return setTable()
}

export default Users
