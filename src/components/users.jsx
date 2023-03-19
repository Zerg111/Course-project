import User from "./user"

const Users = (props) => {
  const { users, onDelete, onToggleBookMark } = props

  return (
    <>
      {users.length > 0 && (
        <table className="table align-middle">
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
            {users.map((user) => (
              <User
                key={user._id}
                {...user}
                onDelete={onDelete}
                onToggleBookMark={onToggleBookMark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
