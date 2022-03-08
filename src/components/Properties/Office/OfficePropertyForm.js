//purpose of this module is to produce a form to add a new property

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendProperty } from "../../APIManager"


export const OfficePropertyForm = () => {
    const [property, setProperty] = useState(
        {
            name: "Property",
            userId: parseInt(localStorage.getItem("property_user")),
            street: "N.A",
            stateId: 0,
            cityId:0,
            zipCode: 0,
            neighborhoodId: 0,
            avgSF: "N.A",
            avgRent: "N.A",
            developer: "",
            management: "",
            totalSF: "N.A",
            stories: "N.A",
            imageURL: "https://www.pngitem.com/pimgs/m/475-4750674_multi-storied-building-commercial-building-icon-png-transparent.png",
            typeId: 2,
            industryId: "N.A",
            statusId:0,
            occupancy:""
        }
    )
    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
    const [types, setTypes] = useState([])

    
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
                    (typeResonse) => {
                        setTypes(typeResonse)
                    }
                )
        },
        []
    )

    const history = useHistory()



    return (
        <>
        
        <section className="contentContainer">
            <div className="contentHeader">
                <h2>Add Office Property</h2>
            </div>
            
            <div className="addName">
                <label htmlFor="addName">Add Property Name</label>
                <input className="addName"
                required
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

                        
            
            <label htmlFor="addStatus">Project Status</label>
                        <select className="addStatus"
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

            <div className="addAddressContainer">
                
                <h2>Addresss Information</h2>
                <div className="addressInfoContainer">
                    <div>
                        <label htmlFor="addStreet">Street Address</label>
                        <input
                        className ="addStreet"
                        type="text"
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
                        required
                        className="addCity" 
                        onChange= {
                            (evt) => {
                                setFilteredNeighborhoods(neighborhoods.filter(neighborhood => neighborhood.cityId === parseInt(evt.target.value)))
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
            
            <div className="infoContainer">
                
                <h2>Property Detail</h2>
                <div className="addressInfoContainer">
                    <div>

                    <label htmlFor="addOccupancy">Occupancy %</label>
                        <input
                        className ="addOccupancy"
                        type="number"
                        required
                        
                        placeholder="Enter Occupancy Percentage"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.occupancy = evt.target.value
                                setProperty(copy)
                            }}
                        >
                        </input>

                        <label htmlFor="addTotalSF">Total SF</label>
                        <input
                        className ="addTotalSF"
                        type="number"
                        required
                        
                        placeholder="Enter Total SF"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.totalSF = evt.target.value
                                setProperty(copy)
                            }}
                        ></input>

                        <label htmlFor="addStories">Avg. Square Footage</label>
                        <input
                        className ="addStories"
                        type="number"
                        required
                        placeholder="Enter # of Stories"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.stories = evt.target.value
                                setProperty(copy)
                            }}></input>
                        
                    </div>
                    
                    <div>
                        <label htmlFor="addAvgSFRent">Avg. Rent PSF</label>
                            <input
                            className ="addAvgSFRent"
                            type="number"
                            required
                            placeholder="Enter Avg. PSF Rent"
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.avgRent = evt.target.value
                                    setProperty(copy)
                                }}></input>
                        </div>
                        
                    <div>
                        <label htmlFor="addDeveloper">Property Developer</label>
                        <input
                        className ="addDeveloper"
                        type="text"
                        required
                        placeholder="Enter Developer Name"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.developer = evt.target.value
                                setProperty(copy)
                            }}></input>
                    </div>
                     
                    <div>
                        <label htmlFor="addManagement">Management Company</label>
                        <input
                        className ="addManagement"
                        type="text"
                        required
                        placeholder="Enter Management Co."
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.management = evt.target.value
                                setProperty(copy)
                            }}></input>
                    </div>

                    <div>
                        <label htmlFor="addImage">Property Image</label>
                        <input
                        className ="addImage"
                        type="text"
                        required
                        placeholder="Paste Image URL"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.imageURL = evt.target.value
                                setProperty(copy)
                            }}></input>
                    </div>


                    <button
                    className="submitButton"
                        onClick={
                            (evt) => {
                                sendProperty(property)
                                history.push("/properties")
                            }}>Save Property</button>

                    
                    
                
                </div>
            
            </div> 
            
        </section>
        </>
    )


}