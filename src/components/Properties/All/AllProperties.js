//purpose of this component is to produce a specific user's home page that will include

import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { GetProperties, getPropertyTypes, getStatuses } from "../../APIManager"
import { PropertyMap } from "../../Location/PropertyMap"
import "./AllProperties.css"
/*google*/





//a display of all properties, the navbar, and a button to add a new property

//create component function that will display the nav bar, account properties
export const AllProperties = () => {

    //create useState variables "properties" and "setProperties"
    const[propertyTypes, setPropertyTypes] = useState([])
    const[userProperties, setUserProperties] = useState([])
    const [propertyStatuses, setPropertyStatuses] = useState([])
    const [data, setData] = useState([])
    const [highlight, setHighlight] = useState()
    const [markerHighlight, setMarkerHighLight] = useState()
    const [typeState, setTypeState]=useState(!false)
    const { typeId } =useParams()
    const { statusId } =useParams()
    
    const history = useHistory()

    const colors = {
        1:"red",
        2:"orange",
        3:"blue",
        4:"green",
        5:"lightBlue"
    }

    

    const isSelected = (propertyId, highlightId) => {
        if(highlightId === propertyId){
            return "lightGreen"
        }
    }



    useEffect(
        () =>{
            //Invoke GetProperties from the API manager to fetch all user properties
            GetProperties()
            .then(
                (propResponse) => {
                    //create if/else statement to determine if there is a specific property type that is being requested. If there is no specific property type required, the type ID will be undefined and this should return all properties
                    if(typeId==="0"){
                        //save all properties to userProperties
                        setUserProperties(propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user"))))
                    } else {
                        //if there is a specific property type requested, filter all properties so that only properties with an ID that was received from the URL by useParams method and then save to userProperties
                        const userFilter = propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user")))
                        setUserProperties(userFilter.filter(prop => prop.typeId === parseInt(typeId)))
                        
                    }
                }
            )
            //rerun anytime the type id changes / user requests a different property type
            },[typeId]
    )

    useEffect(
        () =>{
            //Invoke GetProperties from the API manager to fetch all user properties
            GetProperties()
            .then(
                (propResponse) => {
                    //create if/else statement to determine if there is a specific property type that is being requested. If there is no specific property type required, the type ID will be undefined and this should return all properties
                    if(statusId==="0"){
                        //save all properties to userProperties
                        setUserProperties(propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user"))))
                    } else {
                        //if there is a specific property type requested, filter all properties so that only properties with an ID that was received from the URL by useParams method and then save to userProperties
                        const userFilter = propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user")))
                        setUserProperties(userFilter.filter(prop => prop.statusId === parseInt(statusId)))
                        
                    }
                }
            )
            //rerun anytime the type id changes / user requests a different property type
            },[statusId]
    )

    //Invoke GetProperties from the API manager to fetch all propertyType objects and then save to app state
    useEffect(
        () => {
            getPropertyTypes()
                .then(
                    (typesResponse) => {
                        setPropertyTypes(typesResponse)
                    }
                )
        },
        //anytime a user requests a different property type, rerun
        []
    )

    useEffect(
        () => {
            getStatuses()
                .then(
                    (statusResponse) => {
                        setPropertyStatuses(statusResponse)
                    }
                )
        },
        //anytime a user requests a different property type, rerun
        []
    )

    useEffect(
        () => {
            if(statusId===undefined){
                setTypeState(!typeState)
            }
        },[]
    )
    //use type Id from useParams to get the name of the property type to put into string

    let propertyTypeName = ""

    const propertyTypeNames = () => {
        propertyTypeName = propertyTypes.find(type => parseInt(typeId) === type.id)
        if(typeId === "0" || statusId!=undefined){
            return "All"
        } else {
            return propertyTypeName?.name
        }
    }

    let propertyStatusName = ""
    const propertyStatusNames = () => {
        propertyStatusName = propertyStatuses.find(status => parseInt(statusId) === status.id)
        if(statusId === "0" || typeId==="0"){
            return "All"
        } else {
            return propertyStatusName?.name
        }
    }



    return (
        <>

        <div id="all-properties-container">

            <div id="all-properties-header">

                <div className="property-type-container"><h4>{"Filter By Type"}</h4>

                <div className="property-type-select">
                    <form class = "status-type-options" onChange={
                        (evt) => {
                            setTypeState(!typeState)
                            if(evt.target.value === "0"){
                                history.push("/properties/type/0/status/0")
                             
                                
                            } else{
                                const foundPropertyType = propertyTypes.find(type => type.id === parseInt(evt.target.value))
                                setTypeState(!typeState)
                                history.push(`/properties/type/${foundPropertyType.id}/status/${statusId}`)
                            }
                    }
                    }>
                    <label>All</label>
                    <input name= "option" type="radio" value = "0"/>
                    <p></p>
                    {propertyTypes.map(type => {
                        return (
                        <>
                        <label>{type.name}</label>
                        <input name= "option" type="radio" value = {`${type.id}`}/>
                        <p></p>
                        </>
                    )})}
                    </form>
                </div>
                </div>
                
                <div className="property-type-container"><h4>{`Filter By Status`}</h4>
                <div className="property-type-select">
                    <form class = "status-type-options" onChange={
                        (evt) => {
                            if(evt.target.value === "0"){
                                
                                history.push("/properties/type/0/status/0")
                            } else{
                                const foundPropertyStatus = propertyStatuses.find(status => status.id === parseInt(evt.target.value))
                                history.push(`/properties/type/${typeId}/status/${foundPropertyStatus.id}`)
                            }
                    }
                    }>
                    
                    {propertyStatuses.map(status => {
                        return (
                        <>
                        <label>{status.name}</label>
                        <input name= "option" type="radio" value = {`${status.id}`}/>
                        <p></p>
                        </>
                    )})}
                    </form>
                </div>
                </div>
            </div>  
        
        
       
        
            

    {/* Possible sort button to use later */}
    {/* <button className="optionButton">Sort</button> */}


            <div className="properties-map">
                <PropertyMap properties = {userProperties} highlight = {highlight} setHighlight = {setHighlight} markerHighlight = {markerHighlight} setMarkerHighLight={setMarkerHighLight} />    
            </div> 


            <div className="data-download">
                <CSVLink data = {userProperties}>
                    Download {propertyTypeNames()} Data
                </CSVLink>
            </div>
                

            <div className="properties-container">
                {userProperties.map(userProperty => {
                    return(
                        <>
                        
                        <div key={`${userProperty.id}`} className="property-container" style={{backgroundColor: isSelected(userProperty.id, highlight)}}
                        onMouseOver={
                            () => {
                                setMarkerHighLight(userProperty.id)
                                setHighlight(userProperty.id)
                            }
                        }
                        onMouseOut ={
                            () => {
                                setMarkerHighLight("")
                                setHighlight("")
                            }
                            
                        }>
                            <div className="thumbnailContainer">
                                <img className="propertyThumbnail" src = {`${userProperty?.imageURL}`}></img>
                                <div className="thumbnailPropertyType">{`${userProperty.type?.name}`}</div>
                                <div style={{backgroundColor: colors[userProperty?.status.id]}} className="thumbnailPropertyStatus"
                                
                                >{`${userProperty.status?.name}`}</div>
                            </div>
                            
                            <div className = "propertyContainerInfo">

                                <div className="tableName">
                                <Link to={`/properties/${userProperty.id}`}>
                                    <table>
                                        <thead>
                                            <tr>
                                            
                                                <th key= {`${userProperty.name}`}>{`${userProperty.name}`}</th>
                                            
                                            </tr>  
                                        </thead>
                                    </table>
                                </Link>
                            
                                </div>
                                <p></p>
                                
                                
                                
                                
                                
                            </div>    
                        </div>
                        </>
                )
                })}
            </div>  
                




        </div>

            
        </>
    )

}

