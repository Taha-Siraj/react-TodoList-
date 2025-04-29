import React, { useEffect, useState } from 'react'

const App = () => {

  const [userTasks , setUserTaks] = useState('');
  let [tasks , setTasks] = useState([]);

  useEffect(() => {
    const saveTasks = JSON.parse(localStorage.getItem('tasks'))
    if(saveTasks){
      setTasks(saveTasks)
    }
  }, [])
  const AddTasks = (e) => {
    e.preventDefault()
    if(!userTasks){
      alert("Add Tasks")
      return
    }
    console.log(userTasks)
    const updatedTasks = [...tasks, userTasks];
    setTasks(updatedTasks)
    localStorage.setItem('tasks' , JSON.stringify(updatedTasks))
    setUserTaks('');
  }
  const handleChange = (e , index) => {
    const ischecked = e.target.checked;
    const value = e.target.value;
    const updated = [...tasks] 
    console.log('checked' , ischecked , value, updated[index])

  }
  return (
    <div>
      <div>
        <h1>Todo List App</h1>
       <form onSubmit={AddTasks}>
       <input type="text" value={userTasks} className='py-2 px-4 border border-black' placeholder='Add Tasks' onChange={(e) => setUserTaks(e.target.value)} />
       <button className='py-1 px-2 border border-black'>Add Tasks</button>
      {tasks.map((tasks, index) => 
       (<div key={index}>
         <label className='cursor-pointer'>
         <input
           type="checkbox"
           onChange={(e) => handleChange(e, index)}
          />
         {tasks}
          </label>
           
        </div>)
       )}
       </form>
      </div>
    </div>
  )
}

export default App
