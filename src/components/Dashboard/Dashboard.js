import { useEffect, useState } from "react"
import { deleteTask, GetProperties, getPropertyTasks, getUserNotes, updateTask } from "../APIManager"


export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [notes, setNotes] = useState([])
    const [refreshList, setRefreshList] = useState(false)
    const [properties, setProperties] = useState([])


    useEffect(
        () =>{
            GetProperties()
            .then(
                (propResponse) => {
                    setProperties(propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user"))))   
                    }
            )
            },[]
    )

    useEffect(
        () =>{
            getPropertyTasks()
            .then(
                (taskResponse) => {
                    setTasks(((taskResponse.filter(task => task.userId === parseInt(localStorage.getItem("property_user")))).sort((a,b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)).sort((a,b)=> a.completed - b.completed)))   
                    }
            )
            },[refreshList]
    )


    useEffect(
        () =>{
            getUserNotes()
            .then(
                (noteResponse) => {
                    setNotes(noteResponse)   
                    }
            )
            },[]
    )
    
    const foundProperty = (id) => {
        const found = properties.find(property => {
            return property.id === parseInt(id)
        })
        return found.name
    }
    
    
    
    
    
    return (
        <>
            <table className="all-property-tasks">
            <tbody>
                <tr>
                    <th>Property</th>
                    <th>Title</th>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Completed?</th>
                </tr>
                {tasks.map(task => {
                    return <tr>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.text}</td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <input type="checkbox" value={task.completed} checked={task.completed}
                                    onChange = {
                                        () => {
                                            const copy = {...task}
                                            copy.completed = !task.completed
                                            updateTask(copy)
                                            setRefreshList(!refreshList)
                                        }
                                    }></input>
                                
                                
                                </td>
                                <td>
                                    <button 
                                        id={`${task.id}`}
                                        onClick = {
                                            (evt) => {
                                                deleteTask(evt.target.id)
                                                setRefreshList(!refreshList)
                                            }
                                            
                                        }>Delete Task</button>
                                </td>
                            </tr>
                })}
                
            </tbody>
            
        </table>
        </>
    )
}