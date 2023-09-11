import React from 'react'

export default function Modal({ closeModal, task }) {
  return (
    <div className='Modal'>
      <div
        className='overlay'
        onClick={(e) => {
          e.stopPropagation()
          closeModal(task.id)
        }}
      ></div>
      <div className='content'>
        <h1>{task.task}</h1>
        <p>{task.description}</p>
        <b>start: </b>
        <span>{task.startTimestamp.toDate().toDateString()}</span>
        <br />
        <b>end: </b>
        <span>{task.endTimestamp.toDate().toDateString()}</span>
        <br />
        <b>Fullday: </b>
        <span>{task.fullday ? 'V' : 'X'}</span>
        <div
          className='close'
          onClick={() => {
            closeModal(task.id)
          }}
        >
          &times;
        </div>
      </div>
    </div>
  )
}
