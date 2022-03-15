import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getPropertyClasses, getPropertyTypes, getStatuses, sendUserNote } from "../APIManager"
import { UserLocation } from "./UserLocation"


export const UserNoteForm = () => {
    const[propertyStatuses, setPropertyStatuses] = useState([])
    const[propertyTypes, setPropertyTypes] = useState([])
    const[propertyClasses, setPropertyClasses] =useState([])
    const[toggle, setToggle] = useState(false)
    const [note, setNote] =useState({
        
        title:"Untitled Note",
        userId: parseInt(localStorage.getItem("property_user")),
        text: "",
        location: 
            {
                lat:"",
                lng:""
            },
        propertyTypeId: 0,
        propertyClassId: 0,
        propertyStatusId:0,
        noteDate: Date.now()
    })

    useEffect(
        () => {
            getStatuses()
                .then(
                    (statusesResponse) => {
                        setPropertyStatuses(statusesResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getPropertyTypes()
                .then(
                    (typeResponse) => {
                        setPropertyTypes(typeResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getPropertyClasses()
                .then(
                    (classResponse) => {
                        setPropertyClasses(classResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            const copy = {...note}
            copy.location = UserLocation()
            setNote(copy)
        },
        []
    )



    const history = useHistory()

    return(
        <>
        <section className="user-note-form-container">
            <h2>Create New Note</h2>
            <div className="note-form-inputs">

                <label htmlFor="noteInput">Note Title</label>
                    <input
                    type="text"
                    required
                    onChange={
                        (evt) => {
                        const copy = {...note}
                        copy.title = evt.target.value
                        setNote(copy)
                    }}></input>

                <label htmlFor="propertyType">Property Type</label>
                <select 
                name="propertyType"
                onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.propertyTypeId = parseInt(evt.target.value)
                        setNote(copy)}
                    }>
                        
                    <option value ="0">Select Type</option>
                    {propertyTypes.map(type => {
                        return <option value = {`${type?.id}`}>{`${type.name}`}</option>})
                    }
                </select>

                <label htmlFor="propertyClass">Property Class</label>
                <select 
                name="propertyClass"
                onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.propertyClassId = parseInt(evt.target.value)
                        setNote(copy)}
                    }>

                    <option value ="0">Select Class</option>
                    {propertyClasses.map(propClass => {
                        return <option value = {`${propClass?.id}`}>{`${propClass.name}`}</option>})
                    }
                </select>

                <label htmlFor="propertyStatus">Property Status</label>
                <select 
                name="propertyStatus"
                onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.propertyStatusId = parseInt(evt.target.value)
                        setNote(copy)}
                }>
                    <option value ="0">Select Type</option>
                    {propertyStatuses.map(status => {
                        return <option value = {`${status?.id}`}>{`${status.name}`}</option>})
                    }
                    
                    
                </select>

                <label htmlFor="noteInput">Enter Note</label>
                <input
                type="text"
                required
                onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.text = evt.target.value
                        setNote(copy)
                    }}></input>
            </div>
        </section>

        <button
        onClick={
            (evt) => {
                console.log(note)
                sendUserNote(note)
                history.push("user-notes/map")
                
        }}
        >Save Note</button>
        
        </>
        )
    }

    