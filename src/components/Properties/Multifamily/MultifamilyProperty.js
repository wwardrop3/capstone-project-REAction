//Component will produce a page that displays information for the selected project

import { waitForElementToBeRemoved } from "@testing-library/react"
import { ca } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, getMFPropertyFloorplans, getMFRents, getMFUnitSizes, removeProperty, retrieveProperty } from "../../APIManager"


//create component function MultifamilyProperty
export const MultifamilyProperty = ({property, setProperty, floorplans, refresh}) =>{
    const [propUnits, setPropUnits] = useState()
    const [propAvgRent, setPropAvgRent] = useState()
    const [propAvgSF, setPropAvgSF] = useState()
    const [propertyRents, setPropertyRents] = useState([])


    useEffect(
        () => {
            let j = 0
            for(let i = 1; i<5; i++){
                if(floorplans[i]?.active === true){
                    j+=floorplans[i]?.units
                    

                }
                setPropUnits(j)
            }
        },[refresh, property, floorplans]
    )

    useEffect(
        () => {
            getMFRents()
            .then(
                (rentResponse) => {
                    for(const key in floorplans){
                        console.log(floorplans)
                        // setPropertyRents(rentResponse.filter(floorplans[key].id === rentResponse.floorplanId))
                    }
                    
                },[floorplans, refresh]
            )
        }
    )
    
    //need to isolate the most recent 4 for the most updated rents to apply weighted average
    const avgRent = () => {
        console.log(propertyRents)
        }
    


   

    const history = useHistory()





    return (

        <>
        <div className="infoContainer">

               
                <div>
                    <h2>Occupancy</h2>
                    <p>{property?.occupancy}</p>
                </div>

                <div>
                    <h2>Units</h2>
                    <p>{propUnits}</p>
                </div>

                <div>
                    <h2>Average SF</h2>
                    <p>{avgRent()}</p>
                </div>
                    
                <div>
                    <h2>Rent</h2>
                    <p>{propAvgRent}</p>
                </div>
                        
                <div>
                    <h2>Developer</h2>
                    <p>{property?.developer}</p>
                </div>
                     
                <div>
                    <h2>Management</h2>
                    <p>{property?.management}</p>
                </div>

                
        
                
            
        </div>
        </>
    )
}        