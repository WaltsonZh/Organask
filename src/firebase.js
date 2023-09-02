// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjcfHjk930p2eS2KWoB9FMzLeUEGU13Gs',
  authDomain: 'task-manager-816ec.firebaseapp.com',
  projectId: 'task-manager-816ec',
  storageBucket: 'task-manager-816ec.appspot.com',
  messagingSenderId: '530415633798',
  appId: '1:530415633798:web:d9b555586eb4a831811807',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const taskCollection = collection(db, 'tasks')

export const addTask = async (taskData) => {
  await addDoc(taskCollection, taskData)
}

export const removeTask = async (taskId) => {
  await deleteDoc(doc(db, 'tasks', taskId))
}
