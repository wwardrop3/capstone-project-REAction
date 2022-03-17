//the purpose of this component is to trigger components based on urls provided from the NavBar
//this is basically the application switchboard

import { Route } from "react-router-dom"
import { AllProperties } from "./Properties/All/AllProperties"
import { PropertyForm } from "./Properties/All/PropertyForm"
import { Property } from "./Properties/All/Property"
import { EditPropertyModal } from "./Properties/All/EditPropertyModal"
import { useState } from "react"
import { PropertyMap } from "./Location/PropertyMap"
import { UserLocation } from "./LocationTest/UserLocation"
import { UserNoteForm } from "./LocationTest/UserNoteForm"
import { UserNotesMap } from "./LocationTest/UserNotesMap"
import { Dashboard } from "./Dashboard/Dashboard"
import { MFRent } from "./Properties/Multifamily/MFRent"
import { MFRentForm } from "./Properties/Multifamily/MFRentForm"













//create component function "ApplicationViews" to be exported to REaction component
//component will use Route functions to listen for changes in URLs and trigger components in response

export const ApplicationViews = () => {
    


    return (
        <>

       

        <div className="application-views-container">
                {/*When the user first logs in, this route will invoke the AllProperties component.  This will also invoke when the user selects "all properties" option in the nav bar*/}
            <Route exact path = {["/properties", "/"]}>
                <AllProperties />
            </Route>

            {/*When the Navbar options multifamily, office, or industrial is clicked on, this will reInvoke the all properties component except this will include a URL that ends with the propertyTypeId*/}
            <Route exact path = "/properties/type/:typeId(\d+)">
                <AllProperties/>
            </Route>

            {/* This will invoke the master property form and pass in the propertyType # to determine the form detail*/}
            <Route exact path = "/properties/create/:propertyTypeId(\d+)">
                <PropertyForm/>
            </Route> 

            {/* When selecting a specific property on AllProperties component, this Route will invoke the OfficeProperty component*/}

            <Route exact path = "/properties/:propertyId(\d+)">
                <Property />
            </Route>

            <Route exact path= "/properties/rent-information/:propertyId(\d+)">
                <MFRentForm />
            </Route>

            <Route exact path= "/properties/edit">
                <EditPropertyModal />
            </Route>

            <Route exact path= "/properties/map">
                <PropertyMap />
            </Route>

            <Route exact path= "/create-user-note">
                <UserNoteForm />
            </Route>

            

            {/* <Route exact path= "/properties/map">
                <PropertyMap />
            </Route> */}

            <Route exact path= "/user-notes/map">
                <UserNotesMap />
            </Route>


            <Route exact path= "/dashboard">
                <Dashboard />
            </Route>






            

                
            </div>

       
        
    </>
    )

   
}