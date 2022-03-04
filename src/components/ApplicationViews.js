import { Route } from "react-router-dom"
import { PropertyLocations } from "./Location/PropertyLocations"
import { MapContainer, PropertyMap } from "./Location/PropertyMap"

export const ApplicationViews = () => {
    return(
        <Route path = "/test-Locations">
            <MapContainer/>
        </Route>
    )
}