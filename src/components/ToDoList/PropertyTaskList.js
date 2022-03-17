import { useEffect, useState } from "react"
import { deleteTask, getPropertyTasks, updateTask } from "../APIManager"
import { CreatePropertyTask } from "./CreatePropertyTask"


export const PropertyTaskList = ({property}) => {
    const [taskList, setTaskList] = useState([])
    const [refreshList, setRefreshList] = useState(false)


    useEffect(
        () => {
            getPropertyTasks()
            .then(
                (taskResponse) => {
                    setTaskList(((taskResponse.filter(task => task.propertyId === property.id)).sort((a,b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)).sort((a,b)=> a.completed - b.completed)))
                    
        })},[refreshList, property]
    )
 
    return (
        <>

        <h2>{property.name} Task List</h2>

        <table className="property-task-list-table">
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Completed?</th>
                </tr>
                {taskList.map(task => {
                    return <tr>
                                <td>{task.title}</td>
                                <td>{task.text}</td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <input type="checkbox" checked={task.completed}
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

        <div className="create-taske-container">
        <CreatePropertyTask refreshList = {refreshList} setRefreshList = {setRefreshList} property = {property}/>
        </div>
        </>    
        )
}