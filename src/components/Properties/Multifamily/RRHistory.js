//component will return a list of rent rolls for given property


import { property } from "lodash"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteMFUnitRent } from "../../APIManager"

export const RRHistory = ({floorplans, propertyRents, refresh, setRefresh, unitSizes}) => {
    let [tempNum, setTempNum] = useState(0)
    const [detailRefresh, setDetailRefresh] = useState(true)
    const dateArray = new Set()
    const [showObject, setShowObject] = useState(
        {
            
        }
    )

    const reduceSet = (set) => {
        const RRHistory = [...set]
        const filteredRRHistory = RRHistory.sort((a,b) => Date.parse(b) - Date.parse(a))
        return filteredRRHistory
    }

 




    const rentRollDetail = (date) => {
        
        if(showObject[date]===true){
            
           

            return(
                <>
             
                    
                        <tr>
                            <th>Unit Type</th>
                            <th># Units</th>
                            <th>Rent</th>
                            <th>Occupancy</th>
                            
                                    
                        </tr>
                                
                                {propertyRents.map(rent => {
             
                                    if(rent.date === date){
                                        const foundFloorplan = floorplans.find(plan => {
                                            return plan.id === rent.propertyFloorplanId
                                        })
                                        const foundUnitSize = unitSizes.find(size => {
                                            return size.id === foundFloorplan.sizeId
                                        })
                                        // console.log(floorplans[propertyRents.indexOf(rent)])
                                        return (
                                            <>
                                                <tr>
                                                    <td>{foundUnitSize.name}</td>
                                                    
                                                    
                                                    <td>{foundFloorplan.units}</td>
                                                    <td>{rent.rent}</td>
                                                    <td>{rent.occupancy}</td>
    
                                                    <td>
                                                       
                                                        {/* {rent.rent / floorplans} */}
                                                    </td>
                                                            
                                                     
                                                
                                                    
                                                </tr>
                                                
                                            
                                            </>
                                            )
                                    
                                    }
                                    
                                }
                                    
                                    )
                                    
                                    }
                                 
        
                                
                              
                        
                </>
            )
            


        }
        
        }
                                
                                


//make a new array with each object representing a rent roll
//show date, average rent, occupancy
//when clicked on, show details of each unit type


    return(
        <>
        
        <table>
                    <tbody>
                        <tr>
                            <th>Rent Roll History</th>
                            
                        </tr>
                        {propertyRents.map(rent =>{
                            dateArray.add(rent.date)
                        })}
                        
                        {reduceSet(dateArray).map(date => {
                            return (
                            <>
                            <tr>
                                <td><button
                                value={date}
                                onClick={
                                    (evt) => {
                                        showObject[date] = !showObject[date]
                                        setDetailRefresh(!detailRefresh)
                                        
                                    }
                                }>{date}</button></td>
                                <td>
                                    <button
                                    value={date}
                                    onClick={
                                        (evt) => {
                                            propertyRents.forEach(rent => {
                                                if(rent.date === evt.target.value){
                                                    deleteMFUnitRent(rent.id)
                                                }
                                            })
                                            setRefresh(!refresh)
                                            
                                        }
                                    }>Delete Rent Roll</button>
                                </td>
                                </tr>
                                {rentRollDetail(date)}
                            
                            
                        
                            </>
                            )})}


                    
                    </tbody>
        </table>

        
        
        </>
    )
}