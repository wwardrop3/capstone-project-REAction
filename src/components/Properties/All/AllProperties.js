//purpose of this component is to produce a specific user's home page that will include

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { GetProperties, getPropertyTypes, getPropertyType } from "../../APIManager"
import "./AllProperties.css"


//a display of all properties, the navbar, and a button to add a new property

//create component function that will display the nav bar, account properties
export const AllProperties = () => {

    //create useState variables "properties" and "setProperties"
    const[propertyTypes, setPropertyTypes] = useState([])
    const[userProperties, setUserProperties] = useState([])
    const {typeId} =useParams()
    
    const history = useHistory()

    
    useEffect(
        () =>{
            //Invoke GetProperties from the API manager to fetch all user properties
            GetProperties()
            .then(
                (propResponse) => {
                    //create if/else statement to determine if there is a specific property type that is being requested. If there is no specific property type required, the type ID will be undefined and this should return all properties
                    if(typeId===undefined){
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
        [typeId]
    )

    //use type Id from useParams to get the name of the property type to put into string
    const typeNo = parseInt(typeId)
   const propType = propertyTypes
   console.log(propType, typeNo)
    


    return (
        <>
            <div className="contentContainer">
                <div className="propertiesHeader">
                    <p className="propertyTypeContainer">Properties</p>    
                    <div className="buttonsContainer">

                        {/* Possible sort button to use later */}
                        {/* <button className="optionButton">Sort</button> */}

                        <select className="addPropertyDropdown"
                        onChange = {
                            (evt) => {
                                const foundPropertyType = propertyTypes.find(type => type.id === parseInt(evt.target.value))
                                const typeName = foundPropertyType.name
                                history.push(`/properties/create/${foundPropertyType.id}`)
                            }}
                            >
                            <option value = "0">Add Property</option>
                        {propertyTypes.map(type => {
                            return <option value = {`${type.id}`}>{`${type.name}`}</option>})}   
                        </select>
                    </div>    
                </div>

                <div className="propertyDetail">
                    {userProperties.map(userProperty => {
                        return(
                            <>
                            <div key={`${userProperty.id}`} className="propertyContainer">
                                <div className="thumbnailContainer">
                                    <img className="propertyThumbnail" src = {`${userProperty.imageURL}`}></img>
                                    <div className="thumbnailPropertyType">{`${userProperty.type.name}`}</div>
                                    <div className="thumbnailPropertyStatus">{`${userProperty.status.name}`}</div>
                                </div>
                                
                                <div className = "propertyContainerInfo">

                                    <div className="tableName">
                                    <Link to={`/properties/${userProperty.type.name}/${userProperty.id}`}>
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
                                    
                                    
                                    
                                    
                                    <div className="tableAddress">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>{`${userProperty.street}`}</th>
                                                </tr> 
                                                <tr>
                                                    <th>{`${userProperty.city.name}`}</th>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                </tr> 
                                            </thead>
                                        </table>
                                    </div>   
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

