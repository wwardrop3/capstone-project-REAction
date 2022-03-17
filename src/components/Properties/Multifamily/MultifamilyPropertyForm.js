//purpose of this module is to produce a form to add a new property

import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getCities, getMFfloorplans, getMFUnitSizes, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendProperty, sendPropertyFloorplan } from "../../APIManager"


export const MultifamilyPropertyForm = ({property, setProperty, floorplans, setFloorplans}) => {

        const [unitSizes, setUnitSizes] = useState([])
        const { propertyId } = useParams()
        const history = useHistory()
        

    return (
        <>
       
        {/* Above this is the add address components and below this is the property type - specific information*/}
            <div className="infoContainer">
                
                <h2>Addresss Information</h2>
                <div className="addressInfoContainer">

                    
                        
                    <div>
                        <label htmlFor="addDeveloper">Property Developer</label>
                        <input
                        value={property.developer}
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
                        value={property.management}
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
                        value={property.imageURL}
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

                    <div className="check-floorplans">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Unit Type</th>
                                    <th>Active?</th>
                                    <th>No. Units</th>
                                    <th>Avg. SF</th>
                                    
                                </tr>
                                {unitSizes.map(unit => {
                                    return (
                                        <>
                                            <tr>
                                            <td>{unit.name}</td>
                                            <td><input 
                                            type="checkbox" 
                                           
                                            // checked={floorplans.sizeId.active}
                                                    onChange = {
                                                        (evt) => {
                                                           
                                                            const copy = {...floorplans[unit.Id]}
                                                            copy.active = !copy.active
                                                            setFloorplans(copy)
                                                        }
                                                    }
                                            
                                            
                                            /></td>
                                            <td><input
                                            // style={{display: floorplans[unit.id].applicable ? "":"display:none;"}}
                                            type="number"
                                         
                                            onChange={
                                                (evt) => {
                                                    const copy = {...floorplans}
                                                    copy[unit.id].units = evt.target.value
                                                    setFloorplans(copy)
                                                }
                                            }
                                            
                                            /></td>
                                            <td>
                                            <input
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            
                                            onChange={
                                                (evt) => {
                                                    const copy = {...floorplans}
                                                    copy[unit.id].AvgSF = evt.target.value
                                                    setFloorplans(copy)
                                                    
                                                }
                                            }
                                            
                                            />
                                            </td>
                                            </tr>
                                        
                                        </>)
                                })} 

                            
                            </tbody>
                            
                        </table>

                    </div>


                    {/* <button
                        onClick={
                            () => {
                                history.push(`/properties/rent-information/${property.id}`)
                            }
                        }>Rent Info</button> */}
                           
                    
                    
                
                </div>
            
            </div> 
        </>
    )


}