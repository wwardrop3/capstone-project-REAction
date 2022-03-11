// import React, {Component} from "react";
// import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//     width:"100%",
//     height: "100vh"
// }

// const center = {
//     lat: -3.745,
//     lng: -38.523
//   };

// export const App = () => {
//     return (
//     <LoadScript
//         googleMapsApiKey="AIzaSyAOOul3NMA8auyFgtWcWUCuDsSthTlqLKM"
//     >

//     <GoogleMap
        
//         options={{mapId: "919771f94d285faa"}}
//         mapContainerStyle={containerStyle}
//         center = {center}
//         zoom = {10}
//         >
            
            
//             </GoogleMap>       
            
            
            
            
//     </LoadScript>
//     )

//     }























// // import React from "react";
// // import {
// //     GoogleMap,
// //     useLoadScript,
// //     Marker,
// //     InfoWindow,
// //     LoadScript,
// // } from "@react-google-maps/api"

// // import {
// //     usePlacesAutocomplete ,
// //     getGeocode,
// //     getLatLng,
// //     }from "use-places-autocomplete";

// // import {
// //     Comobox,
// //     ComoboxInput,
// //     ComoboxPopover,
// //     ComoboxList,
// //     ComoboxOption
// // } from "@reach/combobox/styles.css"
// // import GooglePlacesAutocomplete from "react-google-places-autocomplete";


// // //properties that are being passed into the app, but kept outside so they arent rerendered
// // const mappingId = ["919771f94d285faa"]
// // const key= process.env.REACT_APP_GOOGLEAPIKEY
// // const lib = ["places"]


// // //also save mapContainer style outside to it doesnt rerender many times
// // const mapContainerStyle = {
// //     width: "100%",
// //     height: "100vh"
// // }

// // //this is where the map will be centered, again, saved outside of the component
// // const center = {
// //     lat: 43,
// //     lng: -90
// // }

// // export const App = () => {

// //     const {isLoaded} = useLoadScript({
// //         googleMapsApiKey: "AIzaSyAOOul3NMA8auyFgtWcWUCuDsSthTlqLKM"
// //     })

// //     //useLoadScript is hook that brings in an object including the API Key




// //     return(
// //         <div>
// //         <GoogleMap 
// //         mapContainerStyle={mapContainerStyle} 
// //         zoom= {8} 
// //         center= {center}
// //         clickableIcons={false}
// //         options = {
// //             {mapId: "919771f94d285faa",
// //             scrollwheel: "true"
// //             }}
// //         >
        
// //         </GoogleMap>
// //         </div>
        
    
 
    


// //     ) 
    
   
// // }