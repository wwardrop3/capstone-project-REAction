// import { useEffect, useState } from "react"
// import { Geolocation} from "react-geocode"



// export const PropertyLocations = () => {

//     process.env.REACT_APP_GOOGLEAPIKEY

//     const [locations, setLocations] = useState([])

//     useEffect(
//         () => {
//             return fetch("http://localhost:8088/testLocations")
//             .then(res => res.json())
//             .then(
//                 (response) => {
//                     setLocations(response)
//                 }
//             )
//         },[]
//     )

//     useEffect(
//         () => {
//             const copy = {...locations}
//             copy.forEach(location => {
//                 Geolocation.APIKey(APIKey)
//                 Geolocation.fromAddress(`${location.addressStreet}`)
//                 .then(
//                     (response) => {
//                         const {lat, lng} = response.results[0].geometry.location
//                         console.log(lat, lng)
//                     }
//                 )
                
//             });
           
//         }
//     )
        
   

    

//     return(
//         <>
//         {locations.map(location => {
//             return <p id={location.id}>{location.addressStreet}</p>
//         })}
//         </>
//     )
// }