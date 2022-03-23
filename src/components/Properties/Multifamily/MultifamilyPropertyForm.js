//purpose of this module is to produce a form to add a new property

import { keys } from "lodash"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getMFRents, getMFUnitSizes, sendMFUnitRent } from "../../APIManager"
import { MFRentForm } from "./MFRentForm"

//view floorplans is false if this is invoked from the add new property section, and true if being invoked from editing existing property
export const MultifamilyPropertyForm = ({property, setProperty, floorplans, setFloorplans, viewFloorplans, unitSizes, refresh, setRefresh}) => {

        const [viewRentRoll, setViewRentRoll] = useState(false)
        const [saveCheck, setSaveCheck] = useState(false)
        const [newRentRoll, setNewRentRoll] = useState([
            {
                propertyFloorplanId: 1,
                date: "",
                rent: "",
                occupancy: "",
                active: false
                },
            {
                propertyFloorplanId: 1,
                date: "",
                rent: "",
                occupancy: "",
                active: false
            },
            {
                propertyFloorplanId: 1,
                date: "",
                rent: "",
                occupancy: "",
                active: false
            },
            {
                propertyFloorplanId: 1,
                date: "",
                rent: "",
                occupancy: "",
                active: false
            }

        ])
           
        

        const history = useHistory()
        
        const rentSaveCheck = () => {
            if(saveCheck === true){
                return(
                    <p>Rent Saved</p>
                )
            }}
        
        const floorplanCheck = () => {
            if(property.floorplans===true){
                return (
                    <button
                    onClick={
                        () => {
                            console.log(floorplans)
                            setViewRentRoll(!viewRentRoll)
                        }
                    }
                    >View/Hide Rents</button>
                )
            }

           
        }
        
        



    

    //viewfloorplans = none means that its a new property that does not yet have floorplans
    const seeFloorplans = () => {
       
        if(viewFloorplans === true){
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
                            {floorplans.map(plan => {
                        
                                return (
                                    <>
                                        <tr>
                                            <td>{unitSizes[floorplans.indexOf(plan)]?.name}</td>
                                            <td><input 
                                            type="checkbox" 
                                            checked={plan.active}
                                                    onChange = {
                                                        () => {
                                                            const copy = [...floorplans]
                                                            copy[floorplans.indexOf(plan)].active = !copy[floorplans.indexOf(plan)].active
                                                        
                                                            setFloorplans(copy)
                                                            
                                                        }
                                                    }
                                            
                                            
                                            /></td>
                                        <td><input
                                        disabled= {!plan.active}
                                        // style={{display: floorplans[unit.id].applicable ? "":"display:none;"}}
                                        type="number"
                                        value={plan.units}
                                        onChange={
                                            (evt) => {
                                                const copy = [...floorplans]
                                                copy[floorplans.indexOf(plan)].units = parseInt(evt.target.value)
                                            
                                                setFloorplans(copy)

                                            

                                                
                                            }
                                        }
                                        
                                        /></td>

                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!plan.active}
                                            type="number"
                                            value={plan.avgSF}
                                            onChange={
                                                (evt) => {
                                                    const copy = [...floorplans]
                                                    copy[floorplans.indexOf(plan)].avgSF = parseInt(evt.target.value)
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
                    

                {floorplanCheck()}
                
                {seeRentRoll()}
                
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
                            const copy = [...newRentRoll]
                            for(const rent of copy){
                                
                                copy[newRentRoll.indexOf(rent)].date = evt.target.value
                                copy[newRentRoll.indexOf(rent)].propertyFloorplanId = floorplans[newRentRoll.indexOf(rent)].id
                                copy[newRentRoll.indexOf(rent)].active = floorplans[newRentRoll.indexOf(rent)].active
                            }
                            setNewRentRoll(copy)
                            
                            }

                        }/>
    
                    <table>
                        <tbody>
                            <tr>
                                <th>Unit Type</th>
                                <th>Average Rent</th>
                                <th>Average Occupancy</th>
                                <th>Rent PSF</th>
                                
                            </tr>
                            {floorplans.map(plan => {
                                return (
                                    <>
                                        <tr>
                                            <td>{unitSizes[floorplans.indexOf(plan)].name}</td>
                                            
                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!plan.active}
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            onChange={
                                                (evt) => {
                                                    const copy =[...newRentRoll]
                                                    copy[floorplans.indexOf(plan)].rent = parseInt(evt.target.value)
                                                    setNewRentRoll(copy)
                                                    
                                                }
                                            }
                                            
                                            />
                                            </td>

                                            <td>
                                            <input
                                            //When floorplans is inactive, input box will be grayed out
                                            disabled= {!plan.active}
                                            // style={floorplans[unit.id].applicable ? "":"display:none;"}
                                            type="number"
                                            onChange={
                                                (evt) => {
                                                    const copy = [...newRentRoll]
                                                    copy[floorplans.indexOf(plan)].occupancy = parseInt(evt.target.value)
                                                    setNewRentRoll(copy)
                                             
      
                                                }
                                            }
                                            
                                            />
                                            </td>

                                            <td>
                                                {newRentRoll[floorplans.indexOf(plan)].rent / plan.avgSF}
                                            </td>
                                        </tr>
                                    
                                    </>)
                            })}
                                

                        
                        </tbody>
                        
                    </table>
                    
                    <button
                    onClick={
                        () => {
                            if(newRentRoll[0].date === ""){
                                window.alert("Select a date")
                            } else {
                                newRentRoll.map(rent => {
                                    sendMFUnitRent(rent)
                                    setSaveCheck(!saveCheck)
                                    setRefresh(!refresh)
                                    
                                })
                                
                            }
                            
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
                    
                
                
                
                  
            </div>
        
        </>
        )

}