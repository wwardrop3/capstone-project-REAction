//MASTER COMPONENT FOR ALL PROPERTY DETAILS
import { waitForElementToBeRemoved } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, getMFPropertyFloorplans, removeProperty, retrieveProperty, updateProperty } from "../../APIManager"
import { PropertyTaskList } from "../../ToDoList/PropertyTaskList"
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
    const { propertyId } = useParams()
    const [refresh, setRefresh] = useState(true)
    const [propertyCopy, setPropertyCopy] = useState({})
    const [floorplans, setFloorplans] = useState({
            1: {
                AvgSF:"",
                sizeId: 1,
                propertyId: parseInt(propertyId),
                units:0,
                active: false
            },
            2: {
                AvgSF:"",
                sizeId: 2,
                propertyId: parseInt(propertyId),
                units:0,
                active: false
            },
            3: {
                AvgSF:"",
                sizeId: 3,
                propertyId: parseInt(propertyId),
                units:0,
                active: false
            },
            4: {
                AvgSF:"",
                sizeId: 4,
                propertyId: parseInt(propertyId),
                units:0,
                active: false
            }}
            
        )
    
    

    //fetches the property from database with the ID that matches url param
    useEffect(
        () => {
            retrieveProperty(parseInt(propertyId))
            .then(
                (propResponse) => {
                    setProperty(propResponse)}

                    )
                },[refresh]
        )
            
                //if else state ment...if floorplans exist, set the local floorplans to existing ones, else, set local to new floorplans
            // ).then(
            //     () => {
            //         //if the property has edited floorplans (if so, it will have all 4), otherwise the floorplans will be new templates
            //         if(property.floorplans === true){
            //             getMFPropertyFloorplans()
            //             .then(
            //                 (floorplanResponse) => {
            //                     const filteredResponses = floorplanResponse.filter(plan => plan.propertyId === property.id)
            //                     filteredResponses.map(response => {
            //                         const copy = {...floorplans}
            //                         copy[response.sizeId] = response
            //                         setFloorplans(copy)
            //                         console.log("they exist!")
            //                 }
            //             )
            //         })}})
          
 

    useEffect(
        () => {
            setPropertyCopy({...property})
        },[refresh]
    )



    useEffect(
        () => {
            if(property.floorplans === true){
                console.log("has floorplans")
                getMFPropertyFloorplans()
                .then(
                    (floorplanResponse) => {
                        const filteredResponses = floorplanResponse.filter(plan => plan.propertyId === property.id)
                        filteredResponses.map(response => {
                            floorplans[response.sizeId] = response
                            
                        })})}},[property]
                )
                    
const history = useHistory()


//this function will determine which property type detail is being invoked under the address section
const details = () => {

    switch(property.typeId) {
        case 1:
            return <MultifamilyProperty property = {property} floorplans = {floorplans}/>
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
                    <p>{property.statusId?.name}</p>
                </div>
                
                
                <div>
                    <img className="prop-image" src = {`${property.imageURL}`}></img>
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



            <div className="property-task-container">
                <PropertyTaskList property = {property} />
            </div>

         

            <EditPropertyModal property = {property} setProperty = {setProperty} refresh = {refresh} setRefresh = {setRefresh} floorplans={floorplans} setFloorplans={setFloorplans}
            
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
                
       