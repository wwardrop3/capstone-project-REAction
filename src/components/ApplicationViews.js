//the purpose of this component is to trigger components based on urls provided from the NavBar
//this is basically the application switchboard

import { Route } from "react-router-dom"
import { AllProperties } from "./Properties/All/AllProperties"
import { IndustrialProperty } from "./Properties/Industrial/IndustrialProperty"
import { MultifamilyProperty } from "./Properties/Multifamily/MultifamilyProperty"
import { OfficeProperty } from "./Properties/Office/OfficeProperty"

//create component function "ApplicationViews" to be exported to REaction component
//component will use Route functions to listen for changes in URLs and trigger components in response

export const ApplicationViews = () => {
    return (
        <>
         <Route exact path = "/properties">
            <AllProperties />
        </Route>

        <Route exact path = "/properties/multifamily">
            <MultifamilyProperty />
        </Route>

        <Route exact path = "/properties/office">
            <OfficeProperty />
        </Route>

        <Route exact path = "/properties/industrial">
            <IndustrialProperty />
        </Route>

        <Route exact path = "/properties:propertyId(\d+)">
            <MultifamilyProperty/>
        </Route>
    </>
    )

   
}


    //create Route for NavBar


    //createRoute for

    // <li><Link exact path = "/home">Home</Link></li>
    // <li><Link exact path="/all-properties">All Projects</Link></li>
    // <li><Link exact path = "/multifamily-properties">Multifamily</Link></li>
    // <li><Link exact path = "/office-properties">Office</Link></li>
    // <li><Link exact path = "/industrial-properties">Industrial</Link></li>