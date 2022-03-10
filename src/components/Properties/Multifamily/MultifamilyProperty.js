//Component will produce a page that displays information for the selected project

import { waitForElementToBeRemoved } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, removeProperty, retrieveProperty } from "../../APIManager"


//create component function MultifamilyProperty
export const MultifamilyProperty = ({propertyCopy}) => {


    const history = useHistory()

    
           
                      
    return (

        <>
        <div className="infoContainer">
                <div>
                    <h2>Occupancy</h2>
                    <p>{propertyCopy?.occupancy}</p>
                </div>

                <div>
                    <h2>Units</h2>
                    <p>{propertyCopy?.units}</p>
                </div>

                <div>
                    <h2>Average SF</h2>
                    <p>{propertyCopy?.avgSF}</p>
                </div>
                    
                <div>
                    <h2>Rent</h2>
                    <p>{propertyCopy?.avgRent}</p>
                </div>
                        
                <div>
                    <h2>Developer</h2>
                    <p>{propertyCopy?.developer}</p>
                </div>
                     
                <div>
                    <h2>Management</h2>
                    <p>{propertyCopy?.management}</p>
                </div>
            
           

                
            
        </div>
        </>
    )
}        