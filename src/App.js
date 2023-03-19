import { useState } from "react"
import api from "./api"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"

const initialState = api.users.fetchAll().map((el) => {
  return { ...el }
})

function App() {
  const [users, setUsers] = useState(initialState)

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark }
        } else {
          return user
        }
      })
    )
  }

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  )
}

export default App
