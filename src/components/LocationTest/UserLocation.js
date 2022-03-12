import { GoogleMap } from "@react-google-maps/api"
import { set } from "date-fns"
import { useState } from "react"
import { sendUserNote } from "../APIManager"
import { AllProperties } from "../Properties/All/AllProperties"


export const UserLocation = () => {
    
    const location = {
        lat: "",
        lng: "",
    }

    const posError = () => {
        if (navigator.permissions) {
            navigator.permissions.query({name: "geolocation"}).then(res => {
                if(res.state === 'denied') {
                    alert("Enable Location Permissions")
                }
            })
        } else {
            alert("Unable to access your location")
        }
    }
  

    const showPosition = (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude

        location.lat = lat
        location.lng = lng

    }

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, posError)

    } else {
        alert("Wont work")
    }


return location

}














