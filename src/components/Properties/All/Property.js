//MASTER COMPONENT FOR ALL PROPERTY DETAILS
import { waitForElementToBeRemoved } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, removeProperty, retrieveProperty, updateProperty } from "../../APIManager"
import { IndustrialProperty } from "../Industrial/IndustrialProperty"
import { MultifamilyProperty } from "../Multifamily/MultifamilyProperty"
import { OfficeProperty } from "../Office/OfficeProperty"
import { Modal } from "./EditProperty"


//create component function MultifamilyProperty
export const Property = () => {
    const [property, setProperty] = useState({})
    //below is for the modal, update element
    const [show, setShow] = useState(false)
    const { propertyId } = useParams()
    const [refresh, setRefresh] = useState(true)
    const [propertyCopy, setPropertyCopy] = useState({})

    //fetches the property from database with the ID that matches url param
    useEffect(
        () => {
            retrieveProperty(parseInt(propertyId))
            .then(
                (propResponse) => {
                    setProperty(propResponse)
                }
            )
        },[refresh]
    )

    useEffect(
        () => {
            setPropertyCopy({...property})
        },[refresh]
    )

    const history = useHistory()


//this function will determine which property type detail is being invoked under the address section
const details = () => {

    switch(property.typeId) {
        case 1:
            return <MultifamilyProperty property = {property} />
          break;
        case 2:
            return <OfficeProperty property = {property} />
          break;
        case 3:
            return<IndustrialProperty property = {property} />
          break;
       
      }
}

    
return (
    <>
  
        <section className = "content-container">
            <div className="contentHeader">
                <h2>{`${property.type?.name}`}</h2>
            </div>
            
            <div className="addName">
                <h2>{property.name}</h2>
                <p>{property.statusId?.name}</p>
                
                <div>
                    <img src = {`${property.imageURL}`}></img>
                </div>
            </div>
            

        

            <div className="addAddressContainer">
                <div>
                    <h2>Addresss Information</h2>
                
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
        
            <div className="property-info-container">
                {details()}
            </div>

                <div className="modify-buttons">
                    <button
                        onClick={
                            () =>{
                            setShow(true)
                           
                            }}> Update Property</button>

                

                <button className="deletePropertyBtn"
                    onClick={
                        (evt) => {
                            removeProperty(propertyId)
                            history.push("/properties")
                        }
                    }>Delete Property
                </button>
            </div>
            <Modal property = {property} setProperty = {setProperty} refresh = {refresh} setRefresh = {setRefresh} 
            
                onClose = {
                    () =>{
                        setShow(false) 
                        setRefresh(!refresh)
                        }}
                show = {show}/>
          
        </section>

    </>     
)
                }
                
       