//the purpose of this component is to trigger components based on urls provided from the NavBar
//this is basically the application switchboard

import { Route } from "react-router-dom"
import { AllProperties } from "./Properties/All/AllProperties"
import { IndustrialProperty } from "./Properties/Industrial/IndustrialProperty"
import { IndustrialPropertyForm } from "./Properties/Industrial/IndustrialPropertyForm"
import { MultifamilyProperty } from "./Properties/Multifamily/MultifamilyProperty"
import { MultifamilyPropertyForm } from "./Properties/Multifamily/MultifamilyPropertyForm"
import { OfficeProperty } from "./Properties/Office/OfficeProperty"
import { OfficePropertyForm } from "./Properties/Office/OfficePropertyForm"
import "./ApplicationViews.css"

//create component function "ApplicationViews" to be exported to REaction component
//component will use Route functions to listen for changes in URLs and trigger components in response

export const ApplicationViews = () => {
    return (
        <>
        <div class = "applicationViewsContainer">
             {/*When the user first logs in, this route will invoke the AllProperties component.  This will also invoke when the user selects "all properties" option in the nav bar*/}
         <Route exact path = {["/properties", "/"]}>
            <AllProperties />
        </Route>

        {/*When the Navbar options multifamily, office, or industrial is clicked on, this will reInvoke the all properties component except this will include a URL that ends with the propertyTypeId*/}
        <Route exact path = "/properties/type/:typeId(\d+)">
            <AllProperties/>
        </Route>


        {/*When the "add property" selection is made on the AllProperties component, this route will invoke the specific property type form that is determined by the ending # of the URL*/}
        <Route exact path = "/properties/create/1">
            <MultifamilyPropertyForm/>
        </Route>

        <Route exact path = "/properties/create/2">
            <OfficePropertyForm/>
        </Route>

        <Route exact path = "/properties/create/3">
            <IndustrialPropertyForm/>
        </Route>



        {/* When selecting a specific property on AllProperties component, this Route will invoke the OfficeProperty component*/}
        <Route exact path = "/properties/Office/:propertyId(\d+)">
            <OfficeProperty />
        </Route>

        <Route exact path = "/properties/industrial/:propertyId(\d+)">
            <IndustrialProperty />
        </Route>

        <Route exact path = "/properties/Multifamily/:propertyId(\d+)">
            <MultifamilyProperty />
        </Route>

            
            
            </div>

       
        
    </>
    )

   
}