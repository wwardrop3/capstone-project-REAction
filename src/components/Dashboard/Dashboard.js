import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteTask, GetProperties, getPropertyTasks, getUserNotes, updateTask } from "../APIManager"
import "./Dashboard.css"

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
                    const foundProperty = properties.find(property => {
                        return property.id === task.propertyId
                    })
                    return <tr>
                                <td><Link to = {`/properties/${foundProperty.id}`}>{foundProperty?.name}</Link></td>
                                <td>{task.title}</td>
                                <td>{task.text}</td>
                                <td>{task.dueDate}</td>
                                <td style={{textAlign: "center"}}>
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