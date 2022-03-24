
import { forEach } from "lodash"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteTask, getMFPropertyFloorplans, getMFRents, GetProperties, getPropertyTasks, getUserNotes, retriveUser, updateTask } from "../APIManager"
import "./Dashboard.css"
import { DashboardCharts } from "./DashboardCharts"
import { DashboardTasks } from "./DashboardTasks"

export const Dashboard = () => {
    const [userTasks, setUserTasks] = useState([])
    const [userNotes, setUserNotes] = useState([])
    const [refreshList, setRefreshList] = useState(false)
    const [userProperties, setUserProperties] = useState([])
    const [userFloorplans, setUserFloorplans] = useState([])
    const [userMFRents, setUserMFRents] = useState([])
    const [user, setUser] = useState([])

    useEffect(
        () => {
            retriveUser(parseInt(localStorage.getItem("property_user")))
            .then(
                (userResponse) => {
                    setUser(userResponse)
                }
            )
        },[]
    )


    useEffect(
        () =>{
            GetProperties()
            .then(
                (propResponse) => {
                    setUserProperties(propResponse.filter(prop => prop.userId === parseInt(localStorage.getItem("property_user"))))   
                    }
            )
            },[]
    )

    useEffect(
        () =>{
            getPropertyTasks()
            .then(
                (taskResponse) => {
                    setUserTasks(((taskResponse.filter(task => task.userId === parseInt(localStorage.getItem("property_user")))).sort((a,b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)).sort((a,b)=> a.completed - b.completed)))   
                    }
            )
            },[refreshList]
    )


    useEffect(
        () =>{
            getUserNotes()
            .then(
                (noteResponse) => {
                    setUserNotes(noteResponse)   
                    }
            )
            },[]
    )
    
//get all the floorplans that match with any of the user property ids
    useEffect(
        () => {
            getMFPropertyFloorplans()
            .then(
                (planResponse) => {
                    let copy = [...userFloorplans]
                    userProperties.forEach(propObject => {
                        if(propObject.typeId === 1){
                            planResponse.forEach(plan => {
                                if(plan.propertyId === propObject.id){
                                    
                                    copy.push(plan)
                                }
                            });
                        }
                       
                            
                        
                    });
                    
                    setUserFloorplans(copy)
                    });
                
        },[userProperties]
    )

    
    
    useEffect(
        () => {
            getMFRents()
            .then(
                (rentResponse) => {
                    let copy = [...userMFRents]
                    rentResponse.forEach(rentObject => {
                    userFloorplans.forEach(plan => {
                            if(rentObject.propertyFloorplanId === plan.id){
                                copy.push(rentObject)
                            }
                        });
                        
                    });
                    setUserMFRents(copy)}
            )
        },[userFloorplans]
    )
    const totalPropertiesCalc =(propertyTypeId) => {
        if(propertyTypeId === "All"){
            let totalProperties = 0
            userProperties.forEach(propObject => {
                totalProperties++
                
            });
            return <p>{totalProperties}</p>
            
        } else {
            let totalProperties = 0
            userProperties.forEach(propObject => {
                if(propertyTypeId === propObject.typeId){
                    totalProperties++
                }
                
                
            });
            return totalProperties
        }
    
    }
    
        const totalUnitsCalc = (sizeId) => {
        if(sizeId === "All"){
            let totalUnits = 0
            userFloorplans.forEach(planObject => {
                totalUnits+=planObject.units
                
            });
            return totalUnits
            
        } else {
            let totalUnits = 0
            userFloorplans.forEach(planObject => {
                if(planObject.sizeId === sizeId){
                    totalUnits+=planObject.units
                }
                
                
            });
            return totalUnits
        }
    }
    
        const avgRentCalc = () => {
            let avgRent = 0
            let totalUnits = 0
            userFloorplans.forEach(planObject => {
                if(planObject.active === true){
                    totalUnits += planObject.units
                    const filteredMFRents = userMFRents.filter(rentObject => {
                        return rentObject.propertyFloorplanId === planObject.id
                    })
                    const sortedFilteredMFRents = filteredMFRents.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
                    
       
                    avgRent += sortedFilteredMFRents.slice(-1)[0]?.rent * planObject.units
                    
                }
                
            }
                );
            return avgRent/totalUnits    
            ;
        }
    
    return (
        <>
        <div className="dashboard-charts-container">
            <div className="dashboard-chart-sidebar">
                <p>{`Hello, ${user.name}!`}</p>
                <div className="dashboard-chart-sidebar-content">
                    <div className="sidebar-content-item">
                        Total properties pie chart
                    </div>
                    <div className="sidebar-content-item">
                        MF info box
                        <ul>
                            <li>{totalPropertiesCalc(1)} total properties</li>
                            <li>{totalUnitsCalc(1)} total units</li>
                            <li>{avgRentCalc()}</li>
                        </ul>
                    </div>
                    <div className="sidebar-content-item">
                        Office Info Box
                        <ul>
                           <li>{totalPropertiesCalc(2)}</li>
                            <li>total SF</li>
                            <li>average Occupancy</li>
                        </ul>
                    </div>
                    <div className="sidebar-content-item">
                        Industrial Info Box
                        <ul>
                            <li>{totalPropertiesCalc(3)}</li>
                            <li>total SF</li>
                            <li>average SF</li>
                        </ul>
                    </div>
                    <div className="sidebar-content-item">
                        Total properties pie chart
                    </div>
                </div>
            </div>

            <div className="dashboard-charts-container">
                <DashboardCharts userProperties= {userProperties} userTasks = {userTasks} usernNotes={userNotes} refreshList={refreshList} setRefreshList={setRefreshList} user = {user}/>
            </div>
            


            <div className="dashboard-task-container">
                <DashboardTasks userProperties= {userProperties} userTasks = {userTasks} usernNotes={userNotes} refreshList={refreshList} setRefreshList={setRefreshList}/>

            </div>
        </div>
     
            
        
        
        
        </>

    )
}