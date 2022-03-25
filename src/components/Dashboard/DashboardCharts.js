import React, { useEffect, useState } from "react"
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Line } from 'react-chartjs-2';
import { property } from "lodash";



export const DashboardCharts = ({userProperties, userTasks, userNotes, refreshList, setRefreshList, userFloorplans, userMFRents, propertyTypes}) => {
    const [dynamicLabels, setDynamicLabels] = useState([])
    const emptySet = new Set()
    
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


      const showDynamicLabels = () => {

        
        userMFRents?.forEach(rentObject => {
            const d = new Date()
            emptySet.add(rentObject?.date)
            
        
        }
        )
        const newArray = [...emptySet]
        const sortedNewArray = newArray.sort((a,b) => Date.parse(a) - Date.parse(b))

        console.log(sortedNewArray)
        return sortedNewArray
    
    }
    
    //need weighted average rent by size and by date
    const dynamicRentData = (sizeId) => {
            let avgRentData = []
            const dateArray = showDynamicLabels()
            //each date from dynamic set
            dateArray.forEach(date => {
                
                let avgRent = 0
                let totalUnits = 0
                userFloorplans.forEach(planObject => {
                    
                    if(planObject.active === true && planObject.sizeId === sizeId){
                        console.log(planObject)
                        userMFRents.forEach(rentObject => {
                            
                            //if the rent object is matched with a floorplan AND it matches the current date interation
                            if(rentObject.propertyFloorplanId === planObject.id && rentObject?.date === date){
                                
                                totalUnits += planObject?.units
                                avgRent += rentObject.rent * planObject.units
                                
                            }
                        }
                        )
                        }
                    

                    }
                    )
                    avgRentData.push(avgRent/totalUnits)

                    }
            )
              
            return avgRentData    
            ;
        }

        const dynamicOccupancyData = (sizeId) => {
            let avgOccupancyData = []
            const dateArray = showDynamicLabels()
            //each date from dynamic set
            dateArray.forEach(date => {
                
                let avgOccupancy = 0
                let totalUnits = 0
                userFloorplans.forEach(planObject => {
                    
                    if(planObject.active === true && planObject.sizeId === sizeId){

                        userMFRents.forEach(rentObject => {
                            
                            //if the rent object is matched with a floorplan AND it matches the current date interation
                            if(rentObject.propertyFloorplanId === planObject.id && rentObject?.date === date){
                                
                                totalUnits += planObject?.units
                                avgOccupancy += rentObject.occupancy * planObject.units
                                
                            }
                        }
                        )
                        }
                    

                    }
                    )
                    avgOccupancyData.push(avgOccupancy/totalUnits)

                    }
            )
              
            return avgOccupancyData    
            ;
        }
    
      
                
            
        
            
    




Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const avgRentOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Avg Rent by Unit Type Over Time',
    },
  },
};

const avgOccupancyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Avg Occupancy by Unit Type Over Time',
      },
    },
  };




const avgRentData = {
  labels: showDynamicLabels(),
  datasets: [
    {
      label: 'Studios',
      data: dynamicRentData(1),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: '1 Bedroom',
        data: dynamicRentData(2),
        borderColor: 'rgb(100, 99, 132)',
        backgroundColor: 'rgba(100, 99, 132, 0.5)',
    },
    {
        label: '2 Bedroom',
        data: dynamicRentData(3),
        borderColor: 'rgb(150, 99, 132)',
        backgroundColor: 'rgba(150, 99, 132, 0.5)',
    },
    {
        label: '3 Bedroom',
        data: dynamicRentData(4),
        borderColor: 'rgb(300, 99, 3)',
        backgroundColor: 'rgba(300, 99, 3, 0.5)',
    },
  ],
};

const avgOccupancyData = {
    labels: showDynamicLabels(),
    datasets: [
      {
        label: 'Studios',
        data: dynamicOccupancyData(1),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
          label: '1 Bedroom',
          data: dynamicOccupancyData(2),
          borderColor: 'rgb(100, 99, 132)',
          backgroundColor: 'rgba(100, 99, 132, 0.5)',
      },
      {
          label: '2 Bedroom',
          data: dynamicOccupancyData(3),
          borderColor: 'rgb(150, 99, 132)',
          backgroundColor: 'rgba(150, 99, 132, 0.5)',
      },
      {
          label: '3 Bedroom',
          data: dynamicOccupancyData(4),
          borderColor: 'rgb(300, 99, 3)',
          backgroundColor: 'rgba(300, 99, 3, 0.5)',
      },
    ],
  };



        const totalSFCalc =(propertyTypeId) => {
                let totalSF = 0
                userProperties.forEach(propObject => {
                    if(propertyTypeId === propObject.typeId){
                        totalSF+= propObject.totalSF
                    }
                    
                    
                });
                return totalSF
            }


            const avgOccupancyCalc =(propertyTypeId) => {
                let avgOccupancy = 0
                let totalProperties = 0
                userProperties.forEach(propObject => {
                    if(propertyTypeId === propObject.typeId){
                        avgOccupancy+= propObject.occupancy
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
                        avgSF+= propObject.totalSF
                        totalProperties++
                    }
                    
                    
                });
                return avgSF/totalProperties
            }
        
        
            

    return(
        <>
            <div className="dashboard-chart-area">
                <div className="dashboard-chart-area-header">
                    <p>Chart Header</p>
                    
                </div>

                <div className="chart-one-container">
                    <Line options={avgRentOptions} data={avgRentData}/>
                </div>

                <div className="chart-two-container">
                    <Line options={avgOccupancyOptions} data={avgOccupancyData}/> 
                </div>
              

            
            </div>

        
    
    </>
    )
}
