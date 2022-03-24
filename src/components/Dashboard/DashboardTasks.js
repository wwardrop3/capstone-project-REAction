import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteTask, updateTask } from "../APIManager"
import "./Dashboard.css"


export const DashboardTasks = ({userProperties, userTasks, userNotes, refreshList, setRefreshList}) => {
    const [taskDetailShowObject, setTaskDetailShowObject] = useState({})
    const [taskRefresh, setTaskRefresh] = useState(false)
    
    useEffect(
        () => {
            const copy = {...taskDetailShowObject}
            userTasks.forEach(taskObject => {
                copy[taskObject.id] = false
            });
            setTaskDetailShowObject(copy)
            console.log(copy)
        },[]
    )

    const taskViewCheck = (boolOption, taskObject) => {
        if(boolOption === true){
            return taskObject.text
        }
    }
    
    return(
        <>
        <table className="all-property-tasks">
            <tbody>
                <tr>
                    <th>Property</th>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Completed?</th>
                </tr>
                {userTasks.map(task => {
                    const foundProperty = userProperties.find(property => {
                        return property.id === task.propertyId
                    })
                    return (
                    <>
                    <tr>
                                <td><Link to = {`/properties/${foundProperty?.id}`}>{foundProperty?.name}</Link></td>
                                <td><button
                                    value={task.id}
                                    onClick={
                                        (evt) => {
                                            const copy = {...taskDetailShowObject}
                                            copy[evt.target.value] = !copy[evt.target.value]
                                            console.log(copy[evt.target.value])
                                            setTaskDetailShowObject(copy)
                                            setRefreshList(!refreshList)
                                        }
                                    }>{task.title}</button></td>
                                
                                
                                
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
                            <tr className="task-detail-popup"><td colSpan="5" >{taskViewCheck(taskDetailShowObject[task.id], task)}</td></tr>
                    </>)
                    
                            
                            
                }
                
                )}
                
            </tbody>
            
        </table>

        
        </>
    )
    
}