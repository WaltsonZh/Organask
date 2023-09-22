import { monthName, weekName } from '../utils'

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
        <div className='title'>
          <h1>{task.task}</h1>
          <h2>{task.category}</h2>
        </div>
        <div className='interval'>
          <i className='bx bx-time'></i>
          <div className='time'>
            <p>
              {weekName[start.getDay()]} {monthName[start.getMonth()]} {start.getDate()}
            </p>
            {!task.fullday ? (
              <p>
                {start.getHours()}:{start.getMinutes()}
              </p>
            ) : null}
          </div>
          <i className='bx bx-right-arrow-alt'></i>
          <div className='time'>
            <p>
              {weekName[end.getDay()]} {monthName[end.getMonth()]} {end.getDate()} {start.getFullYear() !== end.getFullYear() ? end.getFullYear() : ''}
            </p>
            {!task.fullday ? (
              <p>
                {end.getHours()}:{end.getMinutes()}
              </p>
            ) : null}
          </div>
        </div>
        <div className='description'>
          <h2>Description</h2>
          <p>{task.description}</p>
        </div>

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
