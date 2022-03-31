
import { ArcElement, Chart, Legend, Tooltip } from "chart.js"
import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { getMFPropertyFloorplans, getMFRents, GetProperties, getPropertyTasks, getPropertyTypes, getUserNotes, retriveUser, updateTask } from "../APIManager"
import "./Dashboard.css"
import { DashboardCharts } from "./DashboardCharts"
import { DashboardTasks } from "./DashboardTasks"

export const Dashboard = () => {
    const [userTasks, setUserTasks] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])
    const [userNotes, setUserNotes] = useState([])
    const [refreshList, setRefreshList] = useState(false)
    const [userProperties, setUserProperties] = useState([])
    const [userFloorplans, setUserFloorplans] = useState([])
    const [userMFRents, setUserMFRents] = useState([])
    const [taskRefresh, setTaskRefresh] = useState(false)
    const [user, setUser] = useState([])
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits:0})
    


    useEffect(
        () => {
            getPropertyTypes()
            .then(
                (typeResponse) => {
                setPropertyTypes(typeResponse)
            })
        },[]
    )


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
                    setUserTasks(((taskResponse.filter(task => task.userId === parseInt(localStorage.getItem("property_user"))).sort((a,b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)).sort((a,b)=> a.completed - b.completed))))  
                    }
            )
            },[taskRefresh]
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

        const totalSFCalc =(propertyTypeId) => {
                let totalSF = 0
                userProperties.forEach(propObject => {
                    if(propertyTypeId === propObject.typeId){
                        totalSF+= parseInt(propObject.totalSF)
                    }
                    
                    
                });
                return totalSF
            }


            const avgOccupancyCalc =(propertyTypeId) => {
                let avgOccupancy = 0
                let totalProperties = 0
                userProperties.forEach(propObject => {
                    if(propertyTypeId === propObject.typeId){
                        avgOccupancy+= parseInt(propObject.occupancy)
                        totalProperties++
                    }
                    
                    
                });
                return avgOccupancy/totalProperties
            }

            const avgSFCalc =(propertyTypeId) => {
                let avgSF = 0
                let totalProperties = 0
                userProperties.forEach(propObject => {
                    if(propertyTypeId === propObject.typeId){
                        avgSF+= parseInt(propObject.totalSF)
                        totalProperties++
                    }
                    
                    
                });
                return avgSF/totalProperties
            }
            Chart.register(ArcElement, Tooltip, Legend)

            const getLabels = () => {
                let labels = []
                propertyTypes.forEach(type => {
                    
                    labels.push(type.name)
            })
        
        return labels
        }
        //pie chart for # of properties by type
            const dynamicPropertyCountDataSet=() => {
                let emptySet = []
                propertyTypes.forEach(type => {
                    emptySet.push(totalPropertiesCalc(type.id))
                });
                return emptySet
            }
            
        
            const data = {
                labels: getLabels(),
                datasets:[
                    {
                        label: "# of properties by type",
                        data: dynamicPropertyCountDataSet(),
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                        
                    }
                ],
                
            }
    const showCharts = () => {
        if(userMFRents.length > 0){
            return 
        }
    }
        
        
    return (
        <>
        <div className="dashboard-charts-container">
            <div className="dashboard-chart-sidebar">
                <h2>{`${user.name}'s Dashboard`}</h2>
            <div className="dashboard-chart-sidebar-content">

                <div className="sidebar-content-item">
                        <h3>Portfolio Overview</h3>
                        <Pie data={data} />
                    </div>

                  
                    <div className="sidebar-content-item">
                        MF info box
                        <ul>
                            <li>{totalPropertiesCalc(1)} total properties</li>
                            <li>{totalUnitsCalc(1).toLocaleString()} total units</li>
                            <li>{formatter.format(avgRentCalc())} weighted Avg. Rent</li>
                        </ul>
                    </div>
                    <div className="sidebar-content-item">
                        Office Info Box
                        <ul>
                           <li>{totalPropertiesCalc(2)} total properties</li>
                            <li>{totalSFCalc(2).toLocaleString()} total square footage</li>
                            <li>{avgOccupancyCalc(2)}% avg. occupancy/property</li>
                        </ul>
                    </div>
                    <div className="sidebar-content-item">
                        Industrial Info Box
                        <ul>
                            <li>{totalPropertiesCalc(3)} total properties</li>
                            <li>{totalSFCalc(3).toLocaleString()} total square footage</li>
                            <li>{avgSFCalc(3).toLocaleString()} avg. SF/property</li>
                        </ul>
                    </div>
                   
                </div>
            </div>
            <div className="dashboard-charts-container">
                <div></div>
              
                <DashboardCharts userProperties= {userProperties} userTasks = {userTasks} usernNotes={userNotes} refreshList={refreshList} setRefreshList={setRefreshList} user = {user} propertyTypes={propertyTypes} userMFRents = {userMFRents} userFloorplans ={userFloorplans} />
            </div>
            


            <div className="dashboard-task-container">
                <DashboardTasks userProperties= {userProperties} userTasks = {userTasks} usernNotes={userNotes} refreshList={refreshList} setRefreshList={setRefreshList} taskRefresh = {taskRefresh} setTaskRefresh={setTaskRefresh}/>

            </div>
        </div>
     
            
        
        
        
        </>

    )
}