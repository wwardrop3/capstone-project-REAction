import { useEffect, useState } from "react"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, updateProperty } from "../../APIManager"
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
export const Modal = (props) => {
    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])



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

        switch(props.property.typeId) {
            case 1:
                return <MultifamilyPropertyForm property = {props.property} setProperty = {props.setProperty}/>
              break;
            case 2:
                return <OfficePropertyForm property = {props.property} setProperty = {props.setProperty}/>
              break;
            case 3:
                return<IndustrialPropertyForm property = {props.property} setProperty = {props.setProperty}/>
              break;
           
          }
    }
//We will use the props input to control the show or not show 
    if(props.show === false){
        return null
    } else {
        return (
            <>
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={evt => evt.stopPropagation()}>
                    
                    <div className="modal-header">
                        <h2 className="modal-title">Edit Property Information</h2>
                    </div>

                <div className="input-element">
                    <label htmlFor="edit-fields">Property Name</label>
                    <input className="edit-fields"
                    required
                    value={props.property.name}
                    type = "text"
                    placeholder="Enter Property Name"
                    onChange={
                        (evt) => {
                            const copy = {...props.property}
                            copy.name = evt.target.value
                            props.setProperty(copy)
                        }
                    }
                ></input>
                </div>
    
                            
                    <div className="input-element">
                            <label htmlFor="addStatus">Project Status</label>
                            <select className="addStatus" 
                            value = {props.property.statusId}
                                onChange= {
                                    (evt) => {
                                        const copy = {...props.property}
                                        copy.statusId = parseInt(evt.target.value)
                                        props.setProperty(copy)
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
                            value = {props.property.street}
                            required
                            placeholder="Enter Street Address"
                            onChange={
                                (evt) => {
                                    const copy = {...props.property}
                                    copy.street = evt.target.value
                                    props.setProperty(copy)
                                }
                            }></input>
                        </div>
    
                        <div>
                        <label htmlFor="addState">State</label>
                            <select 
                            value = {props.property.stateId}
                            required
                            className="addState" 
                            onChange= {
                                (evt) => {
                                    setFilteredCities(cities.filter(city => city.stateId === parseInt(evt.target.value)))
                                    const copy = {...props.property}
                                    copy.stateId = parseInt(evt.target.value)
                                    props.setProperty(copy)
                                    
                                    
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
                            value = {props.property.cityId}
                            required
                            className="addCity"
                            onClick = {
                                () => {setFilteredCities(cities.filter(city => city.stateId === props.property.stateId))
                                }
                            }
                            onChange= {
                                (evt) => {
                                    // When city is chosen, set the city Id in the property object and filter the neighborhoods with that same city I
                                    // setFilteredNeighborhoods(neighborhoods.filter(neighborhood => neighborhood.cityId === parseInt(evt.target.value)))
                                    const copy = {...props.property}
                                    copy.cityId = parseInt(evt.target.value)
                                    props.setProperty(copy)
                                    
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
                            value = {props.property.neighborhoodId}
                            onClick = {
                                () => {setFilteredNeighborhoods(neighborhoods.filter(neighborhood => neighborhood.cityId === props.property.cityId))
                                }
                            }
                            onChange= {
                                (evt) => {
                                    const copy = {...props.property}
                                    copy.neighborhoodId = parseInt(evt.target.value)
                                    props.setProperty(copy)
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
                            value = {props.property.zipCode}
                            className ="addZip"
                            type="text"
                            required
                            placeholder="Enter Zip Code"
                            onChange={
                                (evt) => {
                                    const copy = {...props.property}
                                    copy.zipCode = evt.target.value
                                    props.setProperty(copy)
                                }
                            }></input>
                        </div>
                    </div>
                    </div>
                    {details()}
                </div>

                <div className="modal-footer">
                        <button className="close-button"
                        onClick={
                            () => {
                                props.onClose()
                                updateProperty(props.property)
                                
                            }
                        }>Save Information</button>


                        <button className="update-button"
                        onClick={props.onClose}>Close</button>


                        
                </div>
            </div>
            </>
        )



    }


    
}
