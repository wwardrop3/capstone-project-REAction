//purpose of this component is to produce a specific user's home page that will include

import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { GetProperties, getPropertyTypes } from "../../APIManager"
import { PropertyMap } from "../../Location/PropertyMap"
import "./AllProperties.css"





//a display of all properties, the navbar, and a button to add a new property

//create component function that will display the nav bar, account properties
export const AllProperties = () => {

    //create useState variables "properties" and "setProperties"
    const[propertyTypes, setPropertyTypes] = useState([])
    const[userProperties, setUserProperties] = useState([])
    const [data, setData] = useState([])
    const {typeId} =useParams()
    
    const history = useHistory()

    const colors = {
        1:"green",
        2:"blue",
        3:"orange"
    }
    
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

    let propertyTypeName = ""

    const propertyTypeNames = () => {
        propertyTypeName = propertyTypes.find(type => parseInt(typeId) === type.id)
        if(typeId === undefined){
            return "All"
        } else {
            return propertyTypeName?.name
        }
    }



    return (
        <>

        <div id="all-properties-container">

            <div id="all-properties-header">

                <div className="propertyTypeContainer">{`${propertyTypeNames()} Properties`}</div>
                
            </div>   

    {/* Possible sort button to use later */}
    {/* <button className="optionButton">Sort</button> */}


            <div className="properties-map">
                <PropertyMap properties = {userProperties} />    
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
                        
                        <div key={`${userProperty.id}`} className="propertyContainer">
                            <div className="thumbnailContainer">
                                <img className="propertyThumbnail" src = {`${userProperty?.imageURL}`}></img>
                                <div style={{backgroundColor: colors[userProperty?.type.id]}} className="thumbnailPropertyType">{`${userProperty.type?.name}`}</div>
                                <div className="thumbnailPropertyStatus">{`${userProperty.status?.name}`}</div>
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

