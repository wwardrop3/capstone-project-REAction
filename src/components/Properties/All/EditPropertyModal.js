import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getMFPropertyFloorplans, getMFUnitSizes, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendPropertyFloorplan, updateProperty, updatePropertyFloorplan } from "../../APIManager"
import { IndustrialProperty } from "../Industrial/IndustrialProperty"
import { IndustrialPropertyForm } from "../Industrial/IndustrialPropertyForm"
import { MultifamilyProperty } from "../Multifamily/MultifamilyProperty"
import { MultifamilyPropertyForm } from "../Multifamily/MultifamilyPropertyForm"
import { OfficeProperty } from "../Office/OfficeProperty"
import { OfficePropertyForm } from "../Office/OfficePropertyForm"
import "./EditProperty.css"
import { PropertyForm } from "./PropertyForm"

//props includes all of the properties that were passed into the Modal in property form
//includes onclose function, property, and setProperty
export const EditPropertyModal = ({property, setProperty, floorplans, setFloorplans, show, onClose, unitSizes, refresh, setRefresh}) => {
    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])
    
    const history = useHistory()
    

    //send rent object for each propertyFloorplan


    useEffect(
        () => {
            getStates()
                .then(
                    (stateResponse) => {
                        setStates(stateResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getCities()
                .then(
                    (cityResponse) => {
                        setCities(cityResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getNeighborhoods()
                .then(
                    (neighborhoodResponse) => {
                        setNeighborhoods(neighborhoodResponse)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getStatuses()
                .then(
                    (statusesResponse) => {
                        setStatuses(statusesResponse)
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

    

  


    
    const details = () => {

        switch(property.typeId) {
            case 1:
                //view floorplans === true because it is multifamily, can view floorplan options on all multifamily properties
                return <MultifamilyPropertyForm property = {property} setProperty = {setProperty} floorplans={floorplans} setFloorplans={setFloorplans} viewFloorplans={true} unitSizes = {unitSizes} refresh = {refresh} setRefresh={setRefresh}/>
              break;
            case 2:
                return <OfficePropertyForm property = {property} setProperty = {setProperty}/>
              break;
            case 3:
                return<IndustrialPropertyForm property = {property} setProperty = {setProperty}/>
              break;
           
          }
    }
//We will use the props input to control the show or not show the modal, comes from property component
    if(show === false){
        return null
    } else {
        return (
            <>
        <div className="modal">
            <div className="modal-content">
                    
                    <div className="modal-header">
                        <h2 className="modal-title">Edit Property Information</h2>
                    </div>

                <div className="input-element">
                    <label htmlFor="edit-fields">Property Name</label>
                    <input className="edit-fields"
                    required
                    value={property.name}
                    type = "text"
                    placeholder="Enter Property Name"
                    onChange={
                        (evt) => {
                            const copy = {...property}
                            copy.name = evt.target.value
                            setProperty(copy)
                        }
                    }
                ></input>
                </div>
    
                            
                    <div className="input-element">
                            <label htmlFor="addStatus">Project Status</label>
                            <select className="addStatus" 
                            value = {property.statusId}
                                onChange= {
                                    (evt) => {
                                        const copy = {...property}
                                        copy.statusId = parseInt(evt.target.value)
                                        setProperty(copy)
                                    }
                                }
                            >
                            <option value = {0}>Select Status</option>
                                {statuses.map(status => {
                                    return <option value = {`${status.id}`}>{`${status.name}`}</option>})}
                            </select>
                    </div>
    
                <div className="addAddressContainer">
                    
                    <h4>Addresss Information</h4>
                    <div className="addressInfoContainer">
                        <div>
                            <label htmlFor="addStreet">Street Address</label>
                            <input
                            className ="addStreet"
                            type="text"
                            value = {property.street}
                            required
                            placeholder="Enter Street Address"
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.street = evt.target.value
                                    setProperty(copy)
                                }
                            }></input>
                        </div>
    
                        <div>
                        <label htmlFor="addState">State</label>
                            <select 
                            value = {property.stateId}
                            required
                            className="addState" 
                            onChange= {
                                (evt) => {
                                    setFilteredCities(cities.filter(city => city.stateId === parseInt(evt.target.value)))
                                    const copy = {...property}
                                    copy.stateId = parseInt(evt.target.value)
                                    setProperty(copy)
                                    
                                    
                                }
                            }
                            >
                            <option value = {0}>Select State</option>
                            {states.map(state => {
                                return <option value = {`${state.id}`}>{`${state.name}`}</option>})}
                            </select>
                            
                        </div>
    
    
                        <div>
                            <label htmlFor="addCity">City</label>
                            <select 
                            value = {property.cityId}
                            required
                            className="addCity"
                            onClick = {
                                () => {setFilteredCities(cities.filter(city => city.stateId === property.stateId))
                                }
                            }
                            onChange= {
                                (evt) => {
                                    // When city is chosen, set the city Id in the property object and filter the neighborhoods with that same city I
                                    // setFilteredNeighborhoods(neighborhoods.filter(neighborhood => neighborhood.cityId === parseInt(evt.target.value)))
                                    const copy = {...property}
                                    copy.cityId = parseInt(evt.target.value)
                                    setProperty(copy)
                                    
                                }
                            }
                            >
                            <option value = {0}>Select City</option>
                            {filteredCities.map(city => {
                                return <option value = {`${city.id}`}>{`${city.name}`}</option>})}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="addNeighborhood">Neighborhood</label>
                            <select className="addNeighborhood"
                            value = {property.neighborhoodId}
                            onClick = {
                                () => {setFilteredNeighborhoods(neighborhoods.filter(neighborhood => neighborhood.cityId === property.cityId))
                                }
                            }
                            onChange= {
                                (evt) => {
                                    const copy = {...property}
                                    copy.neighborhoodId = parseInt(evt.target.value)
                                    setProperty(copy)
                                }
                            }
                            >
                            <option value = {0}>Select Neighborhood</option>
                            {filteredNeighborhoods.map(neighborhood => {
                                return <option value = {`${neighborhood.id}`}>{`${neighborhood.name}`}</option>})}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="addZip">Zip Code</label>
                            <input
                            value = {property.zipCode}
                            className ="addZip"
                            type="text"
                            required
                            placeholder="Enter Zip Code"
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.zipCode = evt.target.value
                                    setProperty(copy)
                                }
                            }></input>
                        </div>
                    </div>
                    </div>
                    {details()}
                

                
                </div>


                <div className="modal-footer">
                        <button className="update-button"
                        onClick={
                            () => {
                                if(property.floorplans === true){
                                    floorplans.map(plan => {
                                      
                                        return updatePropertyFloorplan(plan)
                                    })
                                    
                                } else {
                                    floorplans.map(plan => {
                            
                                        return sendPropertyFloorplan(plan)
                                    })
                                }
                            
                                
                                
                                    
                                    property.floorplans = true
                                    updateProperty(property)
                                    setRefresh(!refresh) 
                                    onClose()
                                    
                                
                                
                            }
                        }>Save Information</button>


                        <button className="close-button"
                        onClick={
                            () => {
                                onClose()
                            
                            }
                        
                        
                        }>Close</button>


                        
                </div>
            </div>
            </>
        )



    }


    
}
