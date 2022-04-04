//Component will produce a page that displays information for the selected project

import { waitForElementToBeRemoved } from "@testing-library/react"
import { ca } from "date-fns/locale"
import { indexOf } from "lodash"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deleteProperty, getMFPropertyFloorplans, getMFRents, getMFUnitSizes, removeProperty, retrieveProperty} from "../../APIManager"
import { MFDataCharts } from "./MFDataCharts"
import { RRHistory } from "./RRHistory"


//create component function MultifamilyProperty
export const MultifamilyProperty = ({property, setProperty, floorplans, refresh, setRefresh, unitSizes}) =>{
    const [propUnits, setPropUnits] = useState(0)
    const [propOccupancy, setPropOccupancy] = useState()
    const [propAvgRent, setPropAvgRent] = useState()
    const [propAvgSF, setPropAvgSF] = useState(0)
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits:0})
    const [propertyRents, setPropertyRents] = useState([])


    useEffect(
        () => {
            let copy = propUnits
            copy = 0
            for(const plan of floorplans){
                if(plan.active === true){
                    copy+=plan.units
                    

                }    
            }setPropUnits(copy)
        },[floorplans]
    )

    useEffect(
        () => {
            let copy = propAvgSF
            copy=0
            for(const plan of floorplans){
                if(plan.active === true){
                    copy+=plan.units * plan.avgSF
                    
                }    
            }setPropAvgSF(copy/propUnits)
           
        },[propUnits, refresh]
    )

    useEffect(
        () => {
            getMFRents()
            .then(
                (rentResponse) => {
                    let copy = [...propertyRents]
                    let filteredRents = []
                    //find all rents associated with each floorplan of the property (2 iterations)
                    floorplans.map(plan => {
                        const rentFilter = rentResponse.filter(rent => rent.propertyFloorplanId === plan.id)
                        rentFilter.forEach(rentFil => { filteredRents.push(rentFil)
                            
                        });
                    })
                    
                    copy = filteredRents.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
                    setPropertyRents(copy)
                }
            )
        },[floorplans, refresh]
    )

    useEffect(
        () => {
            let occ = 0
            const copy = [...propertyRents]
            const recentList = copy.slice(-4)
            for(const rent of recentList){
                if(floorplans[recentList.indexOf(rent)]?.active === true){
                    occ+= (floorplans[recentList.indexOf(rent)]?.units * rent.occupancy)
                }    
            }
            setPropOccupancy(occ/propUnits)
        },[propertyRents, refresh]
    )


    useEffect(
        () => {
            let pRent = 0
            const copy = [...propertyRents]
            const recentList = copy.slice(-4)
            for(const rent of recentList){
                if(floorplans[recentList.indexOf(rent)]?.active === true){
                    pRent+= (floorplans[recentList.indexOf(rent)]?.units * rent.rent)
                }    
            }
            setPropAvgRent(pRent/propUnits)
        },[propertyRents, refresh]
    )
    
  



    //need to isolate the most recent 4 for the most updated rents to apply weighted average



    const history = useHistory()





    return (

        <>
        <div className="infoContainer">

            <div className="MFPropertyInfo">
                <div>
                    <h2>Total Units</h2>
                    <p>{propUnits}</p>
                </div>  

                <div>
                    <h2>Average SF (Weighted)</h2>
                    <p>{propAvgSF?.toFixed(0)}</p>
                </div>


                <div>
                    <h2>Occupancy (Weighted)</h2>
                    <p>{propOccupancy?.toFixed(0)}</p>
                </div>

                    
                <div>
                    <h2>Average Rent (Weighted)</h2>
                    <p>{formatter.format(propAvgRent)}</p>
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

        <div className="RRHistory">
            <RRHistory property = {property} floorplans = {floorplans} propertyRents={propertyRents} propUnits = {propUnits} refresh={refresh} setRefresh={setRefresh} unitSizes = {unitSizes}/>
        </div>
        
        <div className="MFDataCharts">
            <MFDataCharts property = {property} floorplans = {floorplans} propertyRents={propertyRents} propUnits = {propUnits} refresh={refresh} setRefresh={setRefresh} unitSizes = {unitSizes}/>
        </div>
            
                
        
                
            
        </div>
        </>
    )
}        