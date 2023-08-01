import React, { FC, useContext, useEffect, useState } from 'react';
import { ITodo } from '../models/response/TodoResponse';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';


const TodoList: FC = () => {
  const { store } = useContext(Context);
  const [tasks, setTasks] = useState<ITodo[]>(store.tasks);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<number>(0);
  const [editTaskBody, setEditTaskBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
		(async function (){
			if(localStorage.getItem('token')){
        await store.GetTodoList();
          setTasks(store.tasks)
          return;
			}
			navigate('/login')
		}())
	}, []);

  const handleNewTaskChange = (event: any) => {
    setNewTask(event.target.value);
  };

  const handleEditTaskChange = (event: any) => {
    setEditTaskBody(event.target.value);
  };

   const handleCreateTask = async () => {
    const responseTask = await store.CreateTask(newTask, false)
    if(responseTask?.data) setTasks([...tasks, responseTask?.data]);
    setNewTask('');
  };

  const handleEditTask = (task: ITodo) => {
    if(task.id) setEditingTask(task.id);
    setEditTaskBody(task.description);
  };

  const handleSaveTask = async (task:ITodo) => {
    const responseTask = await store.UpdateTask({description: editTaskBody, isCompleted:task.isCompleted, id: task.id!})
    const updatedTasks = tasks.map((t) => t.id === task.id ? { ...t, description: editTaskBody } : t);
    setTasks(updatedTasks);
    setNewTask('');
    setEditingTask(0);
    setEditTaskBody('');
  };

  const handleDeleteTask = async (task: ITodo) => {
    await store.DeleteTask(task.id!)
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = async (task:ITodo) => {
    const responseTask = await store.UpdateTask({description: task.description, isCompleted: !task.isCompleted, id: task.id!})
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='todo_container _container'>
      <h1 className='todo__title'>Task List</h1>
      <div className='todo__create'>
        <label htmlFor="new-task">New Task:</label>
        <input
          id="new-task"
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button onClick={handleCreateTask}>Create</button>
      </div>
      <ul className='todo__list'>
        {tasks.map((task) => (
          <li key={task.id} className='todo__li'>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleCompleted(task)}
            />
            {editingTask === task.id ? (
              <>
                <input
                  className='todo__body'
                  type="text"
                  value={editTaskBody}
                  onChange={handleEditTaskChange}
                />
              </>
            ) : (
              <>
                <span className='todo__body'>{task.description}</span>
              </>
            )}
            <div className='todo__btns'>
              {editingTask === task.id 
                ? <button className='todo__btn' onClick={() => handleSaveTask(task)}>Save</button>
                : <button className='todo__btn' onClick={() => handleEditTask(task)}>Edit</button>
              }
              <button className='todo__btn' onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;