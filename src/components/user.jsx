import React from "react"
import Qualitie from "./qualitie"
import BookMark from "./bookmark"

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark = false,
    onDelete,
    onToggleBookMark,
  } = props

  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((item) => (
          <Qualitie key={item._id} {...item} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        {
          <BookMark
            status={bookmark}
            onToggleBookMark={() => onToggleBookMark(_id)}
          />
        }
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default User
