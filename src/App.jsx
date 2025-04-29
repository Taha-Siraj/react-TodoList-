import React, { useEffect, useState } from 'react'

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
          <div key={index} className=''>
        <label className='cursor-pointer'>
          <input
           type="checkbox" 
           onChange={(e) => handleChange(e, index) }
           />
          <span className={item.completed ? 'line-through text-[#b2b2b2] ': ''}>{item.text}</span>
        </label>
      </div>
        )
      })}
      </form>
    </div>
  )
}

export default App
