import React from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, MarkerProps} from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { geocodeByAddress } from 'react-google-places-autocomplete';

const id = ["919771f94d285faa"]
const key= process.env.REACT_APP_GOOGLEMAPS_APIKEY
const lib = ["places"]





export const PropertyMap = () => {
    const [properties, setProperties] = useState([])
    const [selected, setSelected] =useState({})
    //view will keep the view of the map the same after closing the popup window on a property
    const [view, setView] = useState(
        {
            lat: 36.16049743877696, 
            lng: -86.78448535520621
    })

    const onSelect = (property) => {
        setSelected(property)
        setView(property.location)
        }
   

    useEffect(
        () => {
            return fetch("http://localhost:8088/properties")
            .then(res => res.json())
            .then(
                (response) => {
                    setProperties(response.filter(property => property.userId === parseInt(localStorage.getItem("property_user"))
                ))}
            )},[]
    )
    

    const mapStyles = {        
    height: "100vh",
    width: "100vw",
    position: "fixed"};
    

    

    return (
        <>
        <div id = "map-content">
        <LoadScript libraries = {lib} mapIds = {id}>
        
        
            
            
        <GoogleMap
        
            
            mapContainerStyle={mapStyles}
            zoom={13}
            scrollwheel={true}
            tilt={45}
            options = {{mapId: "919771f94d285faa",
            scrollwheel:"true"}}
            center={view}>
                {
                    properties.map(property => {
                        return(
                            
                            

                            
                            <Marker
                            
                            class = "marker"
                            key = {property.id} position = {property.location}
                            onClick={() => 
                                onSelect(property)
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
                            <div className='popup-window'>
                                <h2>{selected.name}</h2>
                                <div className='image-container'>
                                    <img id='prop-image' src = {selected.imageURL} height="300px"></img>
                                
                                </div>
                                    <div>
                                   <p>{`${selected.name} is located at ${selected.street}`}</p>
                                        </div>
                                
                                
                                </div>
                            </InfoWindow>
                    )
                    
                }
            
                </GoogleMap>
                </LoadScript>
            </div>
        </>)
        }
