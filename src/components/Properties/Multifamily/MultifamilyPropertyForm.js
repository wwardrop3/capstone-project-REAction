//purpose of this module is to produce a form to add a new property

import { keys } from "lodash"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getMFRents, getMFUnitSizes, sendMFUnitRent } from "../../APIManager"
import { MFRentForm } from "./MFRentForm"

//view floorplans is false if this is invoked from the add new property section, and true if being invoked from editing existing property
export const MultifamilyPropertyForm = ({property, setProperty, floorplans, setFloorplans, viewFloorplans}) => {

        const [viewRentRoll, setViewRentRoll] = useState(false)
        const [saveCheck, setSaveCheck] = useState(false)
        const [newRentRoll, setNewRentRoll] = useState({
            1: {
                propertyFloorplanId: 1,
                date: "",
                rent: "",
                occupancy: "",
                active: false
                },
            2: {propertyFloorplanId: 1,
            date: "",
            rent: "",
            occupancy: "",
            active: false
        },
            3: {propertyFloorplanId: 1,
            date: "",
            rent: "",
            occupancy: "",
            active: false
        },
        4: {propertyFloorplanId: 1,
            date: "",
            rent: "",
            occupancy: "",
            active: false
}
        })
        const [unitSizes, setUnitSizes] = useState([])
        const history = useHistory()
        
        const rentSaveCheck = () => {
            if(saveCheck === true){
                return(
                    <p>Rent Saved</p>
                )
            }}
        
        
        


    useEffect(
        () => {
            getMFUnitSizes()
            .then(
                (sizeResponse) => {
                    setUnitSizes(sizeResponse)
                }
            )
        },[]
    )

    //viewfloorplans = none means that its a new property that does not yet have floorplans
    const seeFloorplans = () => {
        if(viewFloorplans != "none"){
            return (
                <>
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
                                            checked={floorplans[unit.id]?.active}
                                                    onChange = {
                                                        () => {
                                                            const copy = {...floorplans}
                                                            copy[unit.id].active = !copy[unit.id].active
                                                            console.log(copy)
                                                            setFloorplans(copy)
                                                            
                                                        }
                                                    }
                                            
                                            
                                            /></td>
                                        <td><input
                                        disabled= {!floorplans[unit.id]?.active}
                                        // style={{display: floorplans[unit.id].applicable ? "":"display:none;"}}
                                        type="number"
                                        value={floorplans[unit.id]?.units}
                                        onChange={
                                            (evt) => {
                                                const copy = {...floorplans}
                                                copy[unit.id].units = parseInt(evt.target.value)
                                            
                                                setFloorplans(copy)

                                            

                                                
                                            }
                                        }
                                        
                                        /></td>

                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!floorplans[unit.id]?.active}
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            value={floorplans[unit.id]?.AvgSF}
                                            onChange={
                                                (evt) => {
                                                    const copy = {...floorplans}
                                                    copy[unit.id].AvgSF = parseInt(evt.target.value)
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
                
                </>
            )
        }
    }

    const seeRentRoll = () => {
        if(viewRentRoll === true){
            return (
                <>
                <div className="add-rents">
                    <label htmlFor="rent-roll-date">Rent Roll Date</label>
                    <input
                    type="date"
                    name="rent-roll-date"
                    onChange={
                        (evt) => {
                            const copy = {...newRentRoll}
                            for(const key in floorplans){
                                
                                copy[key].date = evt.target.value
                                copy[key].propertyFloorplanId = floorplans[key].id
                                copy[key].active = floorplans[key].active
                            }
                            setNewRentRoll(copy)
                            
                            }

                        }/>
    
                    <table>
                        <tbody>
                            <tr>
                                <th>Unit Type</th>
                                <th>Rent</th>
                                <th>Occupancy</th>
                                <th>Rent PSF</th>
                                
                            </tr>
                            {unitSizes.map(unit => {
                                return (
                                    <>
                                        <tr>
                                            <td>{unit.name}</td>
                                            
                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!floorplans[unit.id]?.active}
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            onChange={
                                                (evt) => {
                                                    const copy = {...newRentRoll}
                                                    copy[unit.id].rent = parseInt(evt.target.value)
                                                    setNewRentRoll(copy)
                                                    
                                                }
                                            }
                                            
                                            />
                                            </td>

                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!floorplans[unit.id]?.active}
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            onChange={
                                                (evt) => {
                                                    const copy = {...newRentRoll}
                                                    copy[unit.id].occupancy = parseInt(evt.target.value)
                                                    setNewRentRoll(copy)
                                                    console.log(evt.target.value)
      
                                                }
                                            }
                                            
                                            />
                                            </td>

                                            <td>
                                                {newRentRoll[unit.id]?.rent / floorplans[unit.id]?.AvgSF}
                                            </td>
                                        </tr>
                                    
                                    </>)
                            })}
                                

                        
                        </tbody>
                        
                    </table>
                    
                    <button
                    onClick={
                        () => {
                            unitSizes.map(unit => {
                                sendMFUnitRent(newRentRoll[unit.id])
                            })
                            setSaveCheck(!saveCheck)
                        }
                    }>Save Rent Roll</button>

                    {rentSaveCheck()}
                    
                    </div>
                    
            
                
                </>
            )
        }
    } 

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
                </div>

                {seeFloorplans()}
                    
                <button
                onClick={
                    () => {
                        setViewRentRoll(!viewRentRoll)
                    }
                }
                >View/Hide Rents</button>
                {seeRentRoll()}
                
                
                  
            </div>
        
        </>
        )

}