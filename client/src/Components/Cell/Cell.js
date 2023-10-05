import React from 'react'
import "../Cell/Cell.css"
const Cell = ({cellClick, id, text}) => {
  return (
    <div id={id} className="cell" onClick={cellClick}>
        {text}
    </div>
  )
}

export default Cell