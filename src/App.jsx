import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa"
const App = () => {

  const [userTasks , setuserTasks] = useState('');
  const [tasks, settasks] = useState([])

  useEffect(() => {
    const saveTasks = JSON.parse(localStorage.getItem('tasks'));
    if(saveTasks){
      return settasks(saveTasks)
    }else{
      console.log('No tasks found')
    }
  }, [])

  const tasksSubmited = (e) => {
    e.preventDefault()
    if(!userTasks){
      alert('Please add a task')
      return
    }
    const newTaks ={
      id: Date.now(),
      text: userTasks,
      completed : false,
    }
    const newTasks = [...tasks, newTaks];
    settasks(newTasks);
    setuserTasks('')
    localStorage.setItem('tasks' , JSON.stringify(newTasks))
  }
  const handleChange = (e, index) => {
    const newTaks = [...tasks];
    newTaks[index].completed = e.target.checked;
    settasks(newTaks)
    console.log(newTaks)
    localStorage.setItem('tasks' , JSON.stringify(newTaks))
  }
  const deletedTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
  settasks(newTasks);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  };
  return (
    <div>
      <h1>Todo List App</h1>
      <form onSubmit={tasksSubmited}>
      <input 
      type="text"
       placeholder='Add Tasks'
       value={userTasks}
       onChange={(e) =>  setuserTasks(e.target.value) }
        className='py-1 px-3 border border-black ' />
      <button>Add Tasks</button> <br />
      {tasks.map((item , index) => {
        return (
          <div key={item.id} className='flex items-center gap-x-3'>
        <label className='cursor-pointer flex'>
          <input
           type="checkbox"
           checked={item.completed} 
           onChange={(e) => handleChange(e, index) }
           />
        <span className={item.completed ? 'line-through text-[#b2b2b2] ': ''}>{item.text}
        </span>
        </label>
         <span onClick={() => deletedTask(item.id)} className='cursor-pointer'> {item.completed ? <FaRegTrashAlt/>: ''}</span>
      </div>
        )
      })}
      </form>
    </div>
  )
}

export default App
