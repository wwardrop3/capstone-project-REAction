import { Route } from "react-router-dom"
import { PropertyLocations } from "./Location/PropertyLocations"
import { PropertyMap } from "./Location/PropertyMap"
import { AddPropertyForm } from "./Properties/AddPropertyForm"

export const ApplicationViews = () => {
    return(
        <>
        <Route path = "/locations/map">
            <PropertyMap/>
        </Route>
        <Route exact path = "/locations">
            <AddPropertyForm/>
        </Route>
        
        </>
        
    )
}