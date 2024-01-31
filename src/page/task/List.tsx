import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store';
import { taskAction } from '../../store/slices/task.slice';
import api from '../../services/apis/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List() {
    const dispatch = useDispatch()
    const taskStore = useSelector((store: Store) => store.taskStore);
    async function handleAddTask(e: React.FormEvent) {
        e.preventDefault();
        let newTask = {
            "name": (e.target as any).task.value,
        }
        if (!newTask.name) {
            alert("Please fill in")
            return
        }
        api.task.create(newTask)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(taskAction.create(res.data.data));
                    (e.target as any).task.value = ""
                }
            })
            .catch((err) => {
                console.log("err", err)
                alert("Failed")
            })
        async function handleUpdateTask(taskId: number, done: boolean) {
            // e.preventDefault();
            const updatedStatus = done ? 'completed' : 'uncompleted'
            try {
                const res = await api.task.update(taskId, { status: updatedStatus })
                if (res.status == 200) {
                    dispatch(taskAction.update(res.data.data))
                    alert("Updated")
                }
            } catch (err) {
                console.log('err', err)
                alert("Failed")
            }
        }
        async function handleDeleteTask(taskId: number) {
            try {
                const res = await api.task.delete(taskId)
                if (res.status == 200) {
                    dispatch(taskAction.delete(taskId))
                    alert("Done")
                } else {
                    alert("Failed")
                }
            } catch (err) {
                console.log('err', err)
                alert("Failed")
            }
        }
        useEffect(() => {
            api.task.findAll()
                .then(res => {
                    if (res.status == 200) {
                        dispatch(taskAction.setData(res.data.data))
                    }
                })
                .catch(err => {
                    console.log('err', err)
                })
        }, [])
        return (
            <div className='list'>
                <h2>Todo List</h2>
                <h3>Get things done, one item at a time</h3>
                <div className='tasks'>
                    {
                        taskStore.task?.map((item) => {
                            return (
                                <div className='item' key={Date.now() * Math.random()}>
                                    <span className='item-name' style={{ textDecoration: item.status == 'completed' ? 'line-through' : 'none', color: item.status == 'completed' ? '#f3979a' : '#fff' }}>{item.name}</span>
                                    <input
                                        type='checkbox'
                                        checked={item.status == 'completed'}
                                        onChange={(e) => handleUpdateTask(item.id, e.target.checked)}
                                    />
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
                <div className='move'>
                    <span>Move done items at the end?</span>
                </div>
                <div className='add'>
                    <h3>Add to the todo list</h3>
                    <form onSubmit={(e) => {
                        handleAddTask(e)
                    }}>
                        <input type='text' name='task'></input>
                        <button type='submit' name='create'>add item</button>
                    </form>
                    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                </div>
            </div>
        )
    }
}
