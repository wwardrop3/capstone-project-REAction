//purpose of this module is to produce a form to add a new property

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getNeighborhoods, getPropertyTypes, getStates, getStatuses, sendProperty } from "../../APIManager"


export const OfficePropertyForm = ({property, setProperty, show}) => {

    const history = useHistory()



    return (
        <>  
            
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


                </div>
            
            </div> 
        </>
    )


}