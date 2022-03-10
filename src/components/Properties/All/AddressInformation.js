import { useEffect, useState } from "react"
import { getCities, getNeighborhoods, getStates, getStatuses } from "../../APIManager"

export const AddressInformation = () => {

    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
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
            developerId: 0,
            managementId: 0,
            totalSF: "N.A",
            stories: "N.A",
            imageURL: "https://www.pngitem.com/pimgs/m/475-4750674_multi-storied-building-commercial-building-icon-png-transparent.png",
            typeId: 2,
            industryId: "N.A",
            statusId:0,
            occupancy:""
        }
    )

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


    return(
        <>
           
            
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
                </div>
            </div>
        </>
    )
}