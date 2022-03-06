//purpose of this component is to produce a specific user's home page that will include

import { useState } from "react"
import { Link } from "react-router-dom"
import { GetProperties } from "../../APIManager"
import "./AllProperties.css"


//a display of all properties, the navbar, and a button to add a new property

//create component function that will display the nav bar, account properties
export const AllProperties = () => {

    //create useState variables "properties" and "setProperties"
    const [property, setProperty] = useState({})
    const userProperties = GetProperties()
   


    //create useEffect function on imported getProperties function and use setProperties to save to state


    return (
        <>
            <div className="contentContainer">
                <div className="propertiesHeader">
                    <p className="propertyTypeContainer">All Properties</p>    
                    <div className="buttonsContainer">
                        <button className="optionButton">Filter</button>
                        <button className="optionButton">Sort</button>
                        <button className="optionButton">Add Property</button>
                    </div>    
                </div>

                <div className="propertyDetail">
                    {userProperties.map(userProperty => {
                        return(
                            <>
                            <div className="propertyContainer">
                                <img className="propertyThumbnail" src ={`${userProperty.imageURL}`}></img>
                                <div className = "propertyContainerInfo">
                                <Link to={`/properties/${userProperty.id}`}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{`${userProperty.name}`}</th>
                                            <th>{`${userProperty.type.name}`}</th> 
                                        </tr>  
                                    </thead>
                                    
                                </table>
                                </Link>
                                    
                                    <div className="propertyAddress">
                                    {`${userProperty.addressStreet}`}    
                                    </div>   
                                </div>    
                            </div>
                            </>
                        )
                    })
}
                    
                    </div>    
                </div>    
        </>
    )

}

