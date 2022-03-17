//component will provide form to fill our rent information

import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getMFPropertyFloorplans, getMFUnitSizes, sendPropertyFloorplan } from "../../APIManager"



export const MFRentForm = () => {
    const { propertyId } = useParams()
    const [existingFloorplans, setExistingFloorplans] = useState([])
    const [propertyFloorplans, setPropertyFloorplans] = useState({
        1: {
            AvgSF:"",
            sizeId: 1,
            propertyId: parseInt(propertyId),
            units:0,
            active: false
        },
        2: {
            AvgSF:"",
            sizeId: 2,
            propertyId: parseInt(propertyId),
            units:0,
            active: false
        },
        3: {
            AvgSF:"",
            sizeId: 3,
            propertyId: parseInt(propertyId),
            units:0,
            active: false
        },
        4: {
            AvgSF:"",
            sizeId: 4,
            propertyId: parseInt(propertyId),
            units:0,
            active: false
        }}
        
        )
    const [unitSizes, setUnitSizes] = useState([])
    const history = useHistory()

    //send rent object for each propertyFloorplan


    useEffect(
        () => {
            getMFUnitSizes()
            .then(
                (sizeReponse) =>{
                    setUnitSizes(sizeReponse)
                }
            )
        },[]
    )

    useEffect(
        () => {
            getMFPropertyFloorplans()
            .then(
                (floorplanResponse) =>{
                    setExistingFloorplans(floorplanResponse.filter(floorplan => floorplan.propertyId === parseInt(propertyId)))
                }
            )
        },[]
    )


    return(
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
                                    <td><input type="checkbox" 
                                    // checked={existingFloorplans.sizeId.active}
                                            onChange = {
                                                () => {
                                                    const copy = {...propertyFloorplans[unit.Id]}
                                                    copy[unit.id].active = !propertyFloorplans[unit.id].active
                                                    setPropertyFloorplans(copy)
                                                }
                                            }
                                    
                                    
                                    /></td>
                                    <td><input
                                    // style={{display: propertyFloorplans[unit.id].applicable ? "":"display:none;"}}
                                    type="number"
                                    onChange={
                                        (evt) => {
                                            const copy = {...propertyFloorplans}
                                            copy[unit.id].units = evt.target.value
                                            setPropertyFloorplans(copy)
                                        }
                                    }
                                    
                                    /></td>
                                    <td>
                                    <input
                                    // style={propertyFloorplans[unit.id].applicable ? "":"display:none;"}
                                    type="number"
                                    onChange={
                                        (evt) => {
                                            const copy = {...propertyFloorplans}
                                            copy[unit.id].AvgSF = evt.target.value
                                            setPropertyFloorplans(copy)
                                            
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

            <button
            onClick = {
                        () => {
                            unitSizes.map(unitType => {
                                sendPropertyFloorplan(propertyFloorplans[unitType.id])
                                history.push(`../${propertyId}`)

                            })
                        }}

                >Save?</button>
            
        </>
        )
                    }

                



        {/* <div>
            <h2>Enter Floorplan Information</h2>
            {unitSizes.map(unit => {
                return <input
                value={unit.id}
                onChange={
                    (evt) => {
                        const copy = {floorplans}
                        copy.floorplans[unitSizes.id] = 

                    }
                }/>
            })}
        </div> */}
    