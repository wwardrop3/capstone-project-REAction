import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteTask, updateTask } from "../APIManager"
import "./Dashboard.css"


export const DashboardTasks = ({userProperties, userTasks, userNotes, refreshList, setRefreshList, taskRefresh, setTaskRefresh}) => {
    const [taskDetailShowObject, setTaskDetailShowObject] = useState({})
    
    
    useEffect(
        () => {
            const copy = {...taskDetailShowObject}
            userTasks.forEach(taskObject => {
                copy[taskObject.id] = false
            });
            setTaskDetailShowObject(copy)
        
        },[]
    )

    const taskViewCheck = (boolOption, taskObject) => {
        if(boolOption === true){
            return taskObject.text
        }
    }

    const dynamicTaskButton = (boolOption,taskObject) => {
        if(boolOption === true){
            return "Hide Detail"
        } else{
            return `${taskObject?.title}`
        }
    }
    
    const completeCheck = (task) => {
        if(task.completed === true){
            return (
                <button 
                id={`${task.id}`}
                onClick = {
                    (evt) => {
                        deleteTask(evt.target.id)
                        setTaskRefresh(!taskRefresh)
                    }
                    
                }>Delete Task</button>
            )
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
                                <td>{foundProperty?.name}</td>
                                <td><button
                                    value={task.id}
                                    onClick={
                                        (evt) => {
                                            const copy = {...taskDetailShowObject}
                                            copy[evt.target.value] = !copy[evt.target.value]
                                            console.log(copy[evt.target.value])
                                            setTaskDetailShowObject(copy)
                                            setTaskRefresh(!taskRefresh)
                                        }
                                    }>{dynamicTaskButton(taskDetailShowObject[task.id], task)}</button></td>
                                
                                
                                
                                <td>{`${new Date(task.dueDate).getMonth()}/${new Date(task.dueDate).getDay()}`}</td>
                                <td style={{textAlign: "center"}}>
                                    <input type="checkbox" value={task.completed} checked={task.completed}
                                    onChange = {
                                        () => {
                                            const copy = {...task}
                                            copy.completed = !task.completed
                                            updateTask(copy)
                                            setTaskRefresh(!taskRefresh)
                                        }
                                    }></input>
                                
                                
                                </td>
                                
                                <td>
                                    {completeCheck(task)}
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