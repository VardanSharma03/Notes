import "./App.css"
import { v4 as uuidv4 } from 'uuid';
import { useState,useRef,useEffect } from "react"
import Navbar from "./components/navbar"
function App(){
  const edit = useRef()
  const [todo, settodo] = useState('')
  const [title, settitle] = useState('')
  const [todos, settodos] = useState([])
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])  
  const handleAdd = () => {
    settodos([...todos, {id:uuidv4(),title,todo,isCompleted: false}])
    settodo('')
    settitle('')
  }
  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleChange1 = (e) => {
    settitle(e.target.value)
  }
  const handleEdit = (e,id) => {
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let data=todos[index].todo
    let data1=todos[index].title
    settodo(data)
    settitle(data1)
    let newTodos=todos.filter((e)=>{
      return e.id!==id
    })
    settodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e) => {
    let id =e.target.id
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos];
    newTodos.splice(index,1)
    settodos(newTodos)
    saveToLS()
  }
  const handleCheck=(e)=>{
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos];
    console.log(newTodos[index])
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    settodos(newTodos)
    saveToLS()
  }
  return (
    <>
      <div className="container">
        <Navbar/>
        <h2 className="h1">ADD NOTES</h2>
        <div className="addTodo flex">
          <input id="title" type="text" value={title} onChange={handleChange1} placeholder="Title"></input>
          <input ref={edit} type="text" value={todo} onChange={handleChange} placeholder="Notes"></input>
          <button onClick={handleAdd} className="btn">Add</button>
        </div>
        <h2 className="h1">YOUR NOTES</h2>
        
        <div className="todos">
          {todos.map(item=> {
            return (
              <div key={item.id}>
                <h2 className="h">{item.title}</h2>
                <div className="todo flex">
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                <div className="flex">
                  <input onChange={handleCheck} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                <div id={item.id} onClick={(e)=>{handleEdit(e,item.id)}} className="btn">Edit</div>
                <div id={item.id} onClick={handleDelete} className="btn">Delete</div>
                </div>
              </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default App
