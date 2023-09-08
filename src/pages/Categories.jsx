import { removeTask } from '../firebase'
import { useOutletContext } from 'react-router-dom'
import { sortByCategories } from '../utils.js'

export default function Categories() {
  const tasks = useOutletContext()
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

  return (
    <div className='Categories Page'>
      <h1>Categories</h1>
      <div className='Categories--task'>
        {categories.map((category) => {
          return (
            <div key={category} className='folder hide' onClick={toggleFolder}>
              <h4>
                <i className='bx bx-folder'></i>
                {category}
                <i className='bx bx-chevron-up'></i>
              </h4>
              <div className='tasks'>
                {categorizedTasks[category].map((task) => {
                  return (
                    <div key={task.id} className='task'>
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
