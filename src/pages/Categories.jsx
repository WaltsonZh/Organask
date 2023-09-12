import { removeTask } from '../firebase'
import { useOutletContext } from 'react-router-dom'
import { sortByCategories } from '../utils.js'
import Modal from '../components/Modal.jsx'

export default function Categories() {
  const {
    tasks,
    popup: { modal, setModal },
  } = useOutletContext()
  const categorizedTasks = sortByCategories(tasks)
  const categories = Object.keys(categorizedTasks)

  const toggleFolder = (e) => {
    e.target.classList.toggle('hide')
    if (e.target.children[0].children[0].classList.value === 'bx bx-folder') {
      e.target.children[0].children[0].classList.value = 'bx bx-folder-open'
    } else {
      e.target.children[0].children[0].classList.value = 'bx bx-folder'
    }
  }

  const closeModal = (id) => {
    setModal((prevModal) => ({
      ...prevModal,
      [id]: false,
    }))
  }

  return (
    <div className='Categories Page'>
      <h1>Categories</h1>
      <div className='Categories--task'>
        {categories.map((category, index) => {
          return (
            <div key={index} className='folder hide' onClick={toggleFolder}>
              <h4>
                <i className='bx bx-folder'></i>
                {category}
                <i className='bx bx-chevron-up'></i>
              </h4>
              <div className='tasks'>
                {categorizedTasks[category].map((task) => {
                  return (
                    <div key={task.id}>
                      <div
                        className='task'
                        onClick={(e) => {
                          e.stopPropagation()
                          setModal((prevModal) => ({
                            ...prevModal,
                            [task.id]: true,
                          }))
                        }}
                      >
                        <h5>{task.task}</h5>
                        <p>{task.description}</p>
                        <i
                          className='bx bx-trash'
                          onClick={(e) => {
                            e.stopPropagation()
                            removeTask(task.id)
                          }}
                        ></i>
                      </div>
                      {modal[task.id] ? <Modal closeModal={closeModal} task={task} /> : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
