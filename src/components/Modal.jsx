export default function Modal(prop) {
  const { closeModal, task } = prop
  const start = task.startTimestamp.toDate()
  const end = task.endTimestamp.toDate()

  return (
    <div className='Modal' onClick={(e) => e.stopPropagation()}>
      <div
        className='overlay'
        onClick={() => {
          closeModal(task.id)
        }}
      ></div>
      <div className='content'>
        <h1>{task.task}</h1>
        <p>{task.description}</p>
        <b>start: </b>
        <span>{task.fullday ? start.toDateString() : `${start.getHours()}:${start.getMinutes()}`}</span>
        <br />
        <b>end: </b>
        <span>{task.fullday ? end.toDateString() : `${end.getHours()}:${end.getMinutes()}`}</span>
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
