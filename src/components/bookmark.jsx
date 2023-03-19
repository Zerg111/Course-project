import React from "react"

const BookMark = (props) => {
  const { status = false, onToggleBookMark } = props

  return status ? (
    <i
      className="bi bi-bookmark-fill"
      style={{ cursor: "pointer" }}
      onClick={onToggleBookMark}
    ></i>
  ) : (
    <i
      className="bi bi-bookmark"
      style={{ cursor: "pointer" }}
      onClick={onToggleBookMark}
    ></i>
  )
}

export default BookMark
