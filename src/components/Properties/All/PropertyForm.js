//purpose of this module is to produce a form to add a new property

import { useState } from "react"
import { PlacesAutoFill } from "../../APIManager"





export const PropertyForm = () => {
    const [property, setProperty] = useState([])



    return (
        <>
            <section className="contentContainer">
                <div className="contentHeader">
                    <p>Add Property Type Property</p>
                </div>
                
                <div className="addImageContainer">
                    <label></label>
                    <input></input>
                </div>

                <div className="addAddressContainer">
                    <label></label>
                    <div className="addressInfoContainer">

                    
                    
                    </div>
                
                </div>    
                <div className="addInfoContainer">
                    
                </div>

                <button className="submitProperty">
                
                </button>


            </section>
        </>
    )


}