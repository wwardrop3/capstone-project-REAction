import React from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';


const id = ["919771f94d285faa"]
const key= process.env.REACT_APP_GOOGLEAPIKEY
const lib = ["places"]





export const PropertyMap = () => {
    const [locations, setLocations] = useState([])
    const [selected, setSelected] =useState({})
    //view will keep the view of the map the same after closing the popup window on a property
    const [view, setView] = useState(
        {
            lat: 36.16049743877696, 
            lng: -86.78448535520621
    })

    const onSelect = (item) => {
        setSelected(item)
        setView(item.location)
        }
   

    useEffect(
        () => {
            return fetch("http://localhost:8088/locations")
            .then(res => res.json())
            .then(
                (response) => {
                    setLocations(response)
                }
            )
        },[]
    )
    

    const mapStyles = {        
    height: "100vh",
    width: "100%"};
    
 

    
    

    return (
        <LoadScript googleMapsApiKey={key} libraries = {lib} mapIds = {id}>
            
            
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            tilt={45}
            options = {{mapId: "919771f94d285faa"}}
            center={view}>
                {
                    locations.map(item => {
                        return(
                            <Marker 
                            class = "marker"
                            key = {item.id} position = {item.location}
                            onClick={() => 
                                onSelect(item)
                            }
                        
                            />    
                        ) 
                    }
                    )
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                        position={selected.location}
                        clickable={true}
                        onCloseClick={()=>
                            setSelected({})}
                        >
                            <p>{`${selected.name} is a ${selected.type} property located at ${selected.addressStreet}`}</p>
                            </InfoWindow>
                    )
                    
                }
                </GoogleMap>
                </LoadScript>
    )
}