import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store';
import { taskAction } from '../../store/slices/task.slice';
import api from '../../services/apis/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function List() {
    const dispatch = useDispatch()
    const taskStore = useSelector((store: Store) => store.taskStore);
    const [id, setId] = useState(null)
    async function handleAddTask(e: any) {
        e.preventDefault();
        try {
            let newTask = {
                name: e.target.name.value,
            }
            let result = await api.task.create(newTask)
            dispatch(taskAction.create(result.data.data))
            e.target.name.value = ""
        } catch (err) {
            alert("Error")
        }
    }
    async function handleUpdateTask(e: any) {
        e.preventDefault();
        try {
            let newTask = {
                name: e.target.name.value,
            }
            let result = await api.task.update(id, newTask)
            dispatch(taskAction.update(result.data.data))
            e.target.name.value = ""
        } catch (err) {
            alert("Error")
        }
    }
    async function handleDeleteTask(taskId: any) {
        try {
            await api.task.delete(taskId)
            dispatch(taskAction.delete(taskId))
        } catch (err) {
            alert("Error")
        }
    }
    return (
        <div className='list'>
            <h2>Todo List</h2>
            <h3>Get things done, one item at a time</h3>
            <div className='tasks'>
                {
                    taskStore.data?.map((item: any) => {
                        return (
                            <div>
                                <span>{item.name}</span>
                                <button
                                    onClick={() => {
                                        handleUpdateTask(item.id);
                                    }}>
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteTask(item.id)
                                    }}>
                                    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <span>Move done items at the end?</span>
            <div className='add'>
                <h3>Add to the todo list</h3>
                <form onSubmit={(e) => {
                    handleAddTask(e)
                }}>
                    <input type='text' name='name'></input>
                    <button type='submit' name='create'>add item</button>
                </form>
                <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}
