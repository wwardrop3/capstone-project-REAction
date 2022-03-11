//purpose of this module is to produce a form to add a new property

import { useMemo } from "react"
import { useHistory } from "react-router-dom"
import { sendProperty } from "../../APIManager"
import { AllProperties } from "../All/AllProperties"

//continues to modify current property values and uses show to toggle save property button on the form
export const IndustrialPropertyForm = ({property, setProperty, show}) => {


    const history = useHistory()




    return (
        <>
        
        <section className="contentContainer">    
            
            <div className="infoContainer">
                
                <h2>Property Detail</h2>

                <div className="addressInfoContainer">
                    <div>

                    <label htmlFor="addIndustry">Industry</label>
                        <input
                        value = {property.industry}
                        className ="addIndustry"
                        type="text"
                        required
                        placeholder="Add Industry"
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.industry = evt.target.value
                                setProperty(copy)
                            }}
                        >
                        </input>

                        <label htmlFor="addTotalSF">Total SF</label>
                        <input
                        className ="addTotalSF"
                        type="number"
                        required
                        value = {property.totalSF}
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
                                copy.tenants = evt.target.value
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
                                    copy.avgRentPSF = evt.target.value
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
            
        </section>
        </>
    )


}