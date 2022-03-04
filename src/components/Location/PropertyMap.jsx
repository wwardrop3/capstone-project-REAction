import React from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';



export const MapContainer = () => {
    const [locations, setLocations] = useState([])
    const [selected, setSelected] =useState({})
    
    const onSelect = (item) => {
        setSelected(item)
        }
   

    useEffect(
        () => {
            return fetch("http://localhost:8088/testLocations")
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
    const defaultCenter = {
    lat: 36.16049743877696, lng: -86.78448535520621
    }
    
    
    
    return (
        <LoadScript>
            
            map.setMapTypeId('hybrid');
            googleMapsApiKey='AIzaSyAOOul3NMA8auyFgtWcWUCuDsSthTlqLKM' 
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            mapTypeId="satellite"
            tilt={45}
            center={defaultCenter}>
                {
                    locations.map(item => {
                        return(
                            <Marker 
                            key = {item.name} position = {item.location}
                            onClick={() => onSelect(item)}
                            
                            />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                        position={selected.location}
                        clickable={true}
                        onCloseClick={()=>setSelected({})}
                        >
                            <p>selected.name</p>
                            </InfoWindow>
                    )
                    
                }
                </GoogleMap>
                </LoadScript>
    )
}