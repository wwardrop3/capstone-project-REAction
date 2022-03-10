//purpose of this module is to produce a form to add a new property

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendProperty } from "../../APIManager"


export const IndustrialPropertyForm = ({property, setProperty, show}) => {
    
    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
    const [types, setTypes] = useState([])


    const history = useHistory()



    return (
        <>
        
        <section className="contentContainer">
            <div className="contentHeader">
                <h2>Add Industrial Property</h2>
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

                    <label htmlFor="addIndustry">Industry</label>
                        <input
                        className ="addIndustry"
                        type="number"
                        required
                        
                        placeholder="Enter Occupancy Percentage"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.industryId = evt.target.value
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

                        <label htmlFor="addTenants">Property Tenants</label>
                        <input
                        className ="addTenants"
                        type="text"
                        required
                        placeholder="Enter Tenants (separted by commas)"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.avgSF = evt.target.value
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
                    show = {show}
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