import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBjcfHjk930p2eS2KWoB9FMzLeUEGU13Gs',
  authDomain: 'task-manager-816ec.firebaseapp.com',
  projectId: 'task-manager-816ec',
  storageBucket: 'task-manager-816ec.appspot.com',
  messagingSenderId: '530415633798',
  appId: '1:530415633798:web:d9b555586eb4a831811807',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const taskCollection = collection(db, 'tasks')

export const addTask = async (taskData) => {
  await addDoc(taskCollection, taskData)
}

export const removeTask = async (taskId) => {
  await deleteDoc(doc(db, 'tasks', taskId))
}

export const updateTask = async (taskId, data) => {
  await updateDoc(doc(db, 'tasks', taskId), data)
}
