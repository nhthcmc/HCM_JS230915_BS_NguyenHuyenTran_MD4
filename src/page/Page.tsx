import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Task, updateTask } from '../common/interface';
import apis from '../services/apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './page.scss'

export default function Page() {
    // const dispatch = useDispatch()
    const [data, setData] = useState<Task[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result: any = await apis.task.findAll();
                if (result.status == 200) {
                    setData(result.data.data)
                }
            } catch (err) {
                console.log('err', err);
            }
        }
        fetchData()
    }, [])
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ((e.target as any).taskName.value == '') {
            alert(`Please fill in`)
            return
        }
        const taskData = {
            name: (e.target as any).taskName.value
        }
        try {
            let result = await apis.task.create(taskData)
            if (result.status == 200) {
                setData([...data, result.data.data]);
                alert("Added");
                (e.target as any).taskName.value = '';
            }
        } catch (err: any) {
            console.log('err', err);
            (e.target as any).task.value = '';
            alert("Error")
        }
    }
    const handleDelete = async (taskId: number) => {
        try {
            let result = await apis.task.delete(taskId);
            if (result.status == 200) {
                let currentData = data.filter(item => item.id != taskId)
                setData(currentData);
                alert("Deleted")
            }
        } catch (err) {
            console.log('err', err);
        }
    }
    // const handleUpdate = async (taskId: number, checked: boolean) => {
    //     const newStatus = checked ? 'completed' : 'uncompleted'
    //     try {
    //         let result = await apis.task.update(taskId, { status: newStatus })
    //         if (result.status == 200) {
    //             let currentData = data.map(item => {
    //                 if (item.id == result.data.data.id) {
    //                     return result.data.data
    //                 } else {
    //                     return item
    //                 }
    //             })
    //             setData(currentData);
    //             alert("Updated")
    //         }
    //     } catch (err) {
    //         console.log('err', err);
    //     }
    // }
    return (
        <div className='page'>
            <div className='container'>
                <h1>Todo List</h1>
                <p style={{ fontSize: 13 }} className='text'>Get things done, one item at a time!</p>
                {
                    data?.map(item => (
                        <>
                            <div key={Date.now() * Math.random()} className='item'>
                                <span className='content' style={item.status ? { textDecoration: 'line-through', color: "#ccc" } : undefined}>{item.name}</span>
                                <div className='tools'>
                                    {/* <input
                                        type='checkbox'
                                        checked={item.status == 'completed'}
                                        onChange={(e) => handleUpdate(item.id, e.target.checked)}
                                    /> */}
                                    <button
                                        onClick={() => {
                                            handleDelete(item.id)
                                        }}>
                                        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ))
                }
                <div className='toggle'>
                    <div className='box'>
                        <p style={{ fontSize: 13 }}>Move done items at the end?</p>
                        <input type="checkbox" id="toggle" />
                        <label htmlFor="toggle"></label>
                    </div>
                </div>
                <p style={{ fontSize: 20, marginBottom: 5 }}>Add to the todo list:</p>
                <form onSubmit={(e) => {
                    handleAdd(e)
                }}>
                    <input type='text' name='taskName'></input>
                    <button type='submit'>ADD ITEM</button>
                </form>
            </div>
        </div>
    )
}
