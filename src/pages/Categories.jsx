import React, { useEffect, useState } from 'react'
import { taskCollection } from '../firebase'
import { onSnapshot, orderBy, query } from 'firebase/firestore'

export default function Categories() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const unsubscribe = async () => {
      const q = query(taskCollection, orderBy('timestamp'))
      onSnapshot(q, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            }
          })
        )
      })
    }
    return unsubscribe
  }, [])

  console.log(tasks)

  return (
    <div className='Categories Page'>
      <h1>Categories</h1>
    </div>
  )
}
