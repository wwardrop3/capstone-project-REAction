//MASTER COMPONENT FOR ALL PROPERTY DETAILS---triggered when a property is clicked on
import { waitForElementToBeRemoved } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, getMFPropertyFloorplans, getMFUnitSizes, removeProperty, retrieveProperty, updateProperty } from "../../APIManager"
import { PropertyTaskList } from "../../TaskList/PropertyTaskList"
import { IndustrialProperty } from "../Industrial/IndustrialProperty"
import { MultifamilyProperty } from "../Multifamily/MultifamilyProperty"
import { OfficeProperty } from "../Office/OfficeProperty"
import { EditPropertyModal } from "./EditPropertyModal"
import "./Property.css"



//create component function MultifamilyProperty
export const Property = () => {
    const [property, setProperty] = useState({})

    //below is for the modal, update element
    const [show, setShow] = useState(false)
    const [unitSizes, setUnitSizes] = useState([])
    const { propertyId } = useParams()
    const [refresh, setRefresh] = useState(true)
    const [floorplans, setFloorplans] = useState([
        {
            "propertyId": parseInt(propertyId),
            "sizeId": 1,
            "units": 0,
            "avgSF": 0,
            "active": false
        },
        {
            "propertyId": parseInt(propertyId),
            "sizeId": 2,
            "units": 0,
            "avgSF": 0,
            "active": false
        },
        {
            "propertyId": parseInt(propertyId),
            "sizeId": 3,
            "units": 0,
            "avgSF": 0,
            "active": false
        },
        {
            "propertyId": parseInt(propertyId),
            "sizeId": 4,
            "units": 0,
            "avgSF": 0,
            "active": false
        }
    ])
   

    


    //fetches the property from database with the ID that matches url param
    useEffect(
        () => {
            retrieveProperty(parseInt(propertyId))
            .then(
                (propResponse) => {
                    setProperty(propResponse)})
                },[refresh]
        )


//import the floorplans for the property if they already exist shown by the active property
    useEffect(
        () => {
            getMFPropertyFloorplans()
            .then(
                (planResponse) => {
                    if(property.floorplans === true){
                        setFloorplans(planResponse.filter(plan => plan.propertyId === parseInt(propertyId)))
        
                    }
                    
                }
            )
        },[property]
    )

    useEffect(
        () => {
            getMFUnitSizes()
            .then(
                (sizeReponse) =>{
                    setUnitSizes(sizeReponse)
                    
                }
            )
        },[refresh]
    )


    
                    
const history = useHistory()


//this function will determine which property type detail is being invoked under the address section
const details = () => {

    switch(property.typeId) {
        case 1:
            return <MultifamilyProperty property = {property} setProperty= {setProperty} floorplans = {floorplans} refresh = {refresh} setRefresh= {setRefresh} unitSizes = {unitSizes}/>
          break;
        case 2:
            return <OfficeProperty property = {property} floorplans = {floorplans}/>
          break;
        case 3:
            return<IndustrialProperty property = {property} floorplans = {floorplans}/>
          break;
       
      }
}

    
return (
    <>

        
  
        <section className = "content-container">
            <div className="content-header">
                <div className="content-header-text">
                    <h2>{property.name}</h2>
                </div>
                
                <div className="prop-image-container">
                    <img className="prop-image" src = {property.imageURL}></img>
                </div>
                    
                <div className="property-task-container">
                    <PropertyTaskList property = {property} />
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



            

         

            <EditPropertyModal property = {property} setProperty = {setProperty} refresh = {refresh} setRefresh = {setRefresh} floorplans={floorplans} setFloorplans={setFloorplans} unitSizes={unitSizes}
            
                onClose = {
                    () =>{
                        setShow(false)
                        setRefresh(!refresh)
                        
                        }}
                show = {show}
                
                />

                <div className="modify-buttons">
                    <button
                        onClick={
                            () =>{
                            setShow(true)
                           
                            }}> Edit Property</button>

                

                <button className="deletePropertyBtn"
                    onClick={
                        (evt) => {
                            removeProperty(parseInt(propertyId))
                            history.push("/properties")
                        }
                    }>Delete Property
                </button>
            </div>
          
        </section>

    </>     
)
                }
                
       