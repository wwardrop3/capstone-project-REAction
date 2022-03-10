import { useState } from "react"





export const Geocoder = () => {
    const [geolocation, setGeolocation] = useState({})

        return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=")
        .then (res => res.json())
        .then((response) => {
            setGeolocation(response)

        })
        
    }
    

