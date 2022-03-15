//purpose is to produce task list for each property and show uncompleted ones 

import { useEffect, useState } from "react"
import { sendPropertyTask } from "../APIManager"

//on each property detail page, create task list section that shows outstanding tasks and option to add new task



//for each property, display a list of outstanding tasks with a create task button
export const CreatePropertyTask = ({refreshList, setRefreshList, property}) => {
    const [task, setTask] = useState({
        title: "",
        text: "",
        dueDate: "",
        completed: false,
        propertyId: property.id,
        userId: property.userId
    })

    useEffect(
        () => {
            let copy = {...task}
            copy.propertyId = property.id
            setTask(copy)
        },[property, refreshList]
    )




    return(
        <>
        <div className="property-task-list-form">
            <h2>Add Property Task</h2>

            <div className="property-task-list-inputs">
                <div className="property-task-list-input">
                    <label htmlFor="task-title">Task Title</label>
                    <input
                    type="text"
                    placeholder="Enter Task Title"
                    required
                    onChange={
                        (evt) => {
                            const copy = {...task}
                            copy.title = evt.target.value
                            setTask(copy)
                        }
                    }></input>
                </div>


                <div className="property-task-list-input">
                    <label htmlFor="task-text">Task Text</label>
                    <input
                    type="text"
                    placeholder="Enter Task Text"
                    required
                    onChange={
                        (evt) => {
                            const copy = {...task}
                            copy.text = evt.target.value
                            setTask(copy)
                        }
                    }></input>
                </div>

                <div className="property-task-list-input">
                    <label htmlFor="task-due-date">Due Date</label>
                    <input
                    name="task-due-date"
                    type="date"
                    placeholder="Enter Due Date"
                    required
                    onChange={
                        (evt) => {
                            const copy = {...task}
                            copy.dueDate = evt.target.value
                            setTask(copy)
                        }
                    }></input>
                </div>


                <button
                onClick={
                    (evt) => {
                        const copy = {...task}
                        copy.dateCreated=Date.now
                        setTask(copy)
                        sendPropertyTask(task)
                        setRefreshList(!refreshList)
                    }
                }>Save Task</button>
            </div>


        </div>

        </>
    )
}