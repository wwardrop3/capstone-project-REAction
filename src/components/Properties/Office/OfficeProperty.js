//Component will produce a page that displays information for the selected project

import { waitForElementToBeRemoved } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, removeProperty, retrieveProperty } from "../../APIManager"


//create component function MultifamilyProperty
export const OfficeProperty = () => {
    const [property, setProperty] = useState({})
    const { propertyId } = useParams()


    useEffect(
        () => {
            retrieveProperty(parseInt(propertyId))
            .then(
                (propResponse) => {
                    setProperty(propResponse)
                }
            )
        },[]
    )

    const history = useHistory()


    return (
        <>
        {console.log(property)}
  
        <section className="contentContainer">
            <div className="contentHeader">
                <h2>Add Property Type Property</h2>
            </div>
            
            <div className="addName">
                <h2>{property.name}</h2>
                <p>{property.status}</p>
            </div>
            

        

            <div className="addAddressContainer">
                <div>
                    <h2>Addresss Information</h2>
                    <p>{property.street}</p>
                </div>

                <div>
                    <h2>State</h2>
                    <p>{property.state?.name}</p>
                </div>


                <div>
                    <h2>City</h2>
                    <p>{property.city?.name}</p>
                </div>
                    
                <div>
                    <h2>Neighborhood</h2>
                    <p>{property.neighborhood?.name}</p>
                </div>
                    
                <div>
                    <h2>Zip Code</h2>
                    <p>{property.zipCode}</p>
                </div>
           
                      
            </div>
            <div className="infoContainer">
                <div>
                    <h2>Occupancy</h2>
                    <p>{property.totalSF}</p>
                </div>

                <div>
                    <h2>Units</h2>
                    <p>{property.stories}</p>
                </div>

                <div>
                    <h2>Average SF</h2>
                    <p>{property.avgRent}</p>
                </div>
                        
                <div>
                    <h2>Developer</h2>
                    <p>{property.developer}</p>
                </div>
                     
                <div>
                    <h2>Management</h2>
                    <p>{property.management}</p>
                </div>

                <div>
                    <img src = {`${property.imageURL}`}></img>
                </div>

            
            </div> 

            <button className="deletePropertyBtn"
            onClick={
                (evt) => {
                    removeProperty(propertyId)
                    history.push("/properties")
                }
            }>
                Delete Property</button>
            
        </section>
        </>
    )
}