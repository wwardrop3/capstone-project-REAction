//purpose of this module is to produce a form to add a new property

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendProperty } from "../../APIManager"


export const MultifamilyPropertyForm = ({property, setProperty, show}) => {
    
    
    const history = useHistory()



    return (
        <>
       
        {/* Above this is the add address components and below this is the property type - specific information*/}
            <div className="infoContainer">
                
                <h2>Addresss Information</h2>
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

                        <label htmlFor="addUnits">Units</label>
                        <input
                        className ="addUnits"
                        type="number"
                        required
                        
                        placeholder="Enter # of Units"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.units = evt.target.value
                                setProperty(copy)
                            }}
                        ></input>

                        <label htmlFor="addAvgSF">Avg. Square Footage</label>
                        <input
                        className ="addAvgSF"
                        type="number"
                        required
                        placeholder="Enter Avg. SF"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.avgSF = evt.target.value
                                setProperty(copy)
                            }}></input>
                        
                    </div>
                    
                    <div>
                        <label htmlFor="addRent">Avg. Rent</label>
                            <input
                            className ="addRent"
                            type="number"
                            required
                            placeholder="Enter Avg. Rent"
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
                    style = {show}
                    className="submitButton"
                        onClick={
                            (evt) => { 
                                sendProperty(property)
                                history.push("/properties")
                                
                            }}>Save Property</button>
                            {console.log(property)}
                    
                    
                
                </div>
            
            </div> 
        </>
    )


}