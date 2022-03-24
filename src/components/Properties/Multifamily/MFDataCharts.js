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
    ArcElement,
  } from 'chart.js';

  import { Line, Pie } from 'react-chartjs-2';
import { property } from "lodash";



export const MFDataCharts = ({property, floorplans, propertyRents, unitSizes}) => {
    const [dynamicLabels, setDynamicLabels] = useState([])
    const emptySet = new Set()
    
    
            
      
    
        const totalUnitsCalc = (sizeId) => {
        if(sizeId === "All"){
            let totalUnits = 0
            floorplans.forEach(planObject => {
                totalUnits+=planObject.units
                
            });
            return totalUnits
            
        } else {
            let totalUnits = 0
            floorplans.forEach(planObject => {
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
            floorplans.forEach(planObject => {
                if(planObject.active === true){
                    totalUnits += planObject.units
                    const filteredPropertyRents = propertyRents.filter(rentObject => {
                        return rentObject.propertyFloorplanId === planObject.id
                    })
                    const sortedfilteredPropertyRents = filteredPropertyRents.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
                    
       
                    avgRent += sortedfilteredPropertyRents.slice(-1)[0]?.rent * planObject.units
                    
                }
                
            }
                );
            return avgRent/totalUnits    
            ;
        }


      const showDynamicLabels = () => {

        
        propertyRents?.forEach(rentObject => {
            const d = new Date()
            emptySet.add(rentObject?.date)
            
        
        }
        )
        const newArray = [...emptySet]

        return newArray
    
    }
    
    //need weighted average rent by size and by date
    const dynamicRentData = (sizeId) => {
        if(sizeId === "All"){
            let avgRentData = []
            const dateArray = showDynamicLabels()
            //each date from dynamic set
            dateArray.forEach(date => {
                
                let avgRent = 0
                let totalUnits = 0
                floorplans.forEach(planObject => {
                    
                    if(planObject.active === true){
                        console.log(planObject)
                        propertyRents.forEach(rentObject => {
                            console.log(rentObject)
                            //if the rent object is matched with a floorplan AND it matches the current date interation
                            if(rentObject.propertyFloorplanId === planObject.id && rentObject?.date === date){
                                
                                totalUnits += planObject?.units
                                avgRent += rentObject.rent * planObject.units
                                console.log(avgRent)
                                
                            }
                        }
                        )
                        }
                    

                    }
                    )
                    avgRentData.push(avgRent/totalUnits)
                    console.log(totalUnits)

                    }
            )
              
            return avgRentData    
            ;
        } else {
            let avgRentData = []
            const dateArray = showDynamicLabels()
            //each date from dynamic set
            dateArray.forEach(date => {
                
                let avgRent = 0
                let totalUnits = 0
                floorplans.forEach(planObject => {
                    
                    if(planObject.active === true && planObject.sizeId === sizeId){
    
                        propertyRents.forEach(rentObject => {
                            
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
            
        }

        const dynamicOccupancyData = (sizeId) => {
            if(sizeId==="All"){
                let avgOccupancyData = []
                const dateArray = showDynamicLabels()
                //each date from dynamic set
                dateArray.forEach(date => {
                    
                    let avgOccupancy = 0
                    let totalUnits = 0
                    floorplans.forEach(planObject => {
                        
                        if(planObject.active === true){
    
                            propertyRents.forEach(rentObject => {
                                
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
             
            } else {
                let avgOccupancyData = []
            const dateArray = showDynamicLabels()
            //each date from dynamic set
            dateArray.forEach(date => {
                
                let avgOccupancy = 0
                let totalUnits = 0
                floorplans.forEach(planObject => {
                    
                    if(planObject.active === true && planObject.sizeId === sizeId){

                        propertyRents.forEach(rentObject => {
                            
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
         
            }
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
      text: 'Avg Rent Over time',
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
        text: 'Avg occupancy over time',
      },
    },
  };




const avgRentData = {
  labels: showDynamicLabels(),
  datasets: [
    {
        label: 'Property Average',
        data: dynamicRentData("All"),
        borderColor: 'black',
        backgroundColor: 'black',
    },
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
            label: 'Property Average',
            data: dynamicOccupancyData("All"),
            borderColor: 'black',
            backgroundColor: 'black',
        },
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



  Chart.register(ArcElement, Tooltip, Legend)

  const getLabels = () => {
      let labels = []
      unitSizes.forEach(type => {
          
          labels.push(type.name)
  })

return labels
}
//pie chart for # of properties by type
  const dynamicUnitCountDataSet=() => {
      let emptyArray = []
      floorplans.forEach(type => {
          emptyArray.push(type.units)
      });
      return emptyArray
  }
  

  const data = {
      labels: getLabels(),
      datasets:[
          {
              label: "# of properties by type",
              data: dynamicUnitCountDataSet(),
              backgroundColor:[
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 100, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
              
          }
      ],
      
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

                <Pie data={data} />
              

            
            </div>

        
    
    </>
    )
}