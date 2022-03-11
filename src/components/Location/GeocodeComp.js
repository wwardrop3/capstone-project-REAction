//Use this component to geocode properties as separate component


// import axios from "axios"


// export const GeocodeComp = () => {

//     const foundCity = cities.find(city => city.id === property.cityId)
//     const foundState = states.find(state => state.id === property.stateId)
//     const formattedString = `${property?.street}, ${foundCity.name}, ${foundState.name}`

//     const location = {formattedString}
//     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLEAPIKEY}`,{
//     params :{
//         address: {location},
//         key: `${key}`
//     }})
//     .then(response => {
//         const copy = {...property}
//         copy.location = response.data.results[0].geometry?.location
//         sendProperty(copy).then(history.push("/properties")
        
//         )}).catch(console.log("ERROR"))
// }

