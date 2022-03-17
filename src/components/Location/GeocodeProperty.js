import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCities, getStates, sendProperty } from "../APIManager"




export const GeocodeProperty = ({property}, {setProperty}) =>{
    const [state, setState] = useState({})
    const [city, setCity] = useState({})
    console.log({property})

    const history = useHistory()

    useEffect(
        () => {
            getStates()
            .then(
                (response) => {
                    setState(response.find(stateObject => stateObject.id === property.stateId ))
                })
        },[]
    )

    useEffect(
        () => {
            getCities()
            .then(
                (response) => {
                    setCity(response.find(cityObject => cityObject.id === property.cityId ))
                })
        },[]
    )

    const formattedString = `${property?.street}, ${city?.name}, ${state?.name}`
    console.log(formattedString)



    const location = {formattedString}
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA-1SdY6vkTh1FI4i_5OUH9PoHhoRCpzmE`,{
    params :{
        address: {location},
        key: process.env.REACT_APP_GOOGLE_GEOCODE_APIKEY
    }})
    .then(response => {
                let copy = {...property}
                copy.location.latitude = response.data.results[0].geometry.location.lat
                copy.location.longitude = response.data.results[0].geometry.location.lng
                setProperty(copy)
                console.log(copy)
            }
        ).then(sendProperty(property)).then(history.push("/properties"))
        
        .catch(console.log("ERROR"))


}

    
