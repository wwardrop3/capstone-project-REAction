

export const DashboardCharts = ({userProperties, userTasks, userNotes, refreshList, setRefreshList, userFloorplans, userMFRents}) => {

    
    
    return(
        <>
            <div className="dashboard-chart-area">
                <div className="dashboard-chart-area-header">
                    <p>Chart Header</p>
                    <button>filter 1</button>
                    <button>filter 2</button>
                    <button>filter 3</button>
                </div>

                <div className="chart-one-container">
                    chart 1
                </div>

                <div className="chart-two-container">
                    chart 2
                </div>

            
            </div>

        
    
    </>
    )
}
