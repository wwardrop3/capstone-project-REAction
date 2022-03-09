//MASTER COMPONENT FOR FORM COMPONENTS



import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, retrieveProperty } from "../../APIManager"
import { IndustrialPropertyForm } from "../Industrial/IndustrialPropertyForm"
import { MultifamilyPropertyForm } from "../Multifamily/MultifamilyPropertyForm"
import { OfficePropertyForm } from "../Office/OfficePropertyForm"


export const PropertyForm = () => {

    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [states, setStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
    const [statuses, setStatuses] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])
    const { propertyTypeId } = useParams()
    const [property, setProperty] = useState(
        {
            name: "Property",
            userId: parseInt(localStorage.getItem("property_user")),
            street: "No Street Address",
            stateId: 0,
            cityId:0,
            zipCode: 0,
            neighborhoodId: 0,
            avgSF: "No Information",
            avgRent: "No Information",
            developer: "No Information",
            management: "No Information",
            totalSF: "No Information",
            stories: "No Information",
            imageURL: "https://cdn-icons-png.flaticon.com/512/63/63720.png",
            typeId: parseInt(propertyTypeId),
            industry: "No Information",
            statusId:0,
            occupancy:"No Information"
        })
    
        const propertyTypeInt = parseInt(propertyTypeId)


        const propertyTypeObject = propertyTypes.find(type => type.id === propertyTypeInt)

        const details = () => {

            switch(propertyTypeId) {
                case "1":
                    return <MultifamilyPropertyForm property = {property} setProperty = {setProperty}/>
                  break;
                case "2":
                    return <OfficePropertyForm property = {property} setProperty = {setProperty}/>
                  break;
                case "3":
                    return<IndustrialPropertyForm property = {property} setProperty = {setProperty}/>
                  break;
               
              }
        }


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


        

    


        return(

        <>
        
        <section className="contentContainer">
            <div className="contentHeader">
                <h2>Add {`${propertyTypeObject?.name}`} Property</h2>
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

                        
                <div className="inputElement">
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
                </div>

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
                                // When city is chosen, set the city Id in the property object and filter the neighborhoods with that same city Id
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
            {details()}
        
        </section>


</>
)
                    }
                     
                    
                    




    


