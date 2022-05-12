import './App.css'

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'

import axios from 'axios'

function App() {
  const Todos = ({ list }) => {
    return (
      <div className='todos'>
        {list.map((todo) => {
          return (
            <div className='todo'>
              <p>{todo.name}</p>
              <button
                onClick={() => modifyStatusTodo(todo)}
                className='checkbox'
                style={{ backgroundColor: todo.status ? '#A879E6' : '#ffffff' }}
              ></button>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit color={'#64697b'} size={20} />
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete color={'#64697b'} size={20} />
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  async function getTodos() {
    const response = await axios.get('http://localhost:3333/todos')
    setTodos(response.data)
  }

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputVisibility, setInputVisibility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState()

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility)
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisibility(true)
  }

  async function createTodo() {
    const response = await axios.post('http://localhost:3333/todos', {
      name: inputValue,
    })
    getTodos()
    setInputVisibility(!inputVisibility)
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    )
    getTodos()
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put(`http://localhost:3333/todos/`, {
      id: todo.id,
      status: !todo.status,
    })
    getTodos()
  }

  async function editTodo(todo) {
    const response = await axios.put(`http://localhost:3333/todos/`, {
      id: selectedTodo.id,
      name: inputValue,
    })
    setSelectedTodo()
    setInputVisibility(false)
    getTodos()
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className='App'>
      <header className='container'>
        <div className='header'>
          <h1>Dont be lazzy</h1>
        </div>
        <Todos list={todos} />
        <input
          type='text'
          className='inputName'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          style={{ display: inputVisibility ? 'block' : 'none' }}
        />
        <button
          className='newTaskButton'
          onClick={
            inputVisibility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
        >
          {inputVisibility ? 'Confirm' : 'New Task'}
        </button>
      </header>
    </div>
  )
}

export default App
