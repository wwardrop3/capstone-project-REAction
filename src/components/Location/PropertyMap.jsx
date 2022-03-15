import React from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, MarkerProps} from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { geocodeByAddress } from 'react-google-places-autocomplete';
import { Link } from 'react-router-dom';
import { dataSource } from '../APIManager';
import"./style.css"

const id = ["919771f94d285faa"]
const key= process.env.REACT_APP_GOOGLEMAPS_APIKEY
const lib = ["places"]





export const PropertyMap = ({properties}) => {
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
   

    // useEffect(
    //     () => {
    //         return fetch(`${dataSource}/properties`)
    //         .then(res => res.json())
    //         .then(
    //             (response) => {
    //                 setProperties(response.filter(property => property.userId === parseInt(localStorage.getItem("property_user"))
    //             ))}
    //         )},[]
    // )
    

    const mapStyles = {        
    height: "100%",
    width: "100%",
    }
    
    const featureIcons = {
        1: "https://sat02pap002files.storage.live.com/y4mKRaW-VAi6aieJPWPH_dvTR04TeIJzBTqnaKCoyXX2UcgixJmJNS2BOEpaWhIRyjHZBLT-XvS3kJL9TRut2q7f4lsGkaWYG-Tyc7mEYUkxVsJulfezAl5Z8BnL2EL6GClIkPMIVaKE4wiLnSM4N9U4qD2BpOyzRfabaVABmVKqKUyWn2-FqDngGW2Yr1d_W8o?width=50&height=70&cropmode=none",
        3: "https://sat02pap002files.storage.live.com/y4mHgpeON5pXM-ejrFSo2D2Hwl-0EKHpySiLKRLu6eXdpQ7Ywldca7CMEtMJzidX5KXDAIWeKSOgvBZNFC2mU8abf-o9zL5fAWgGg1lHfyp18LKsYiLJIKzweh8YtZH6tj4p0Pf2y2X-yyC7-1sC1g0dEeLL_kANPkBO9R-TUCe60HHR_8p3xeZ1XIxkHT6ODri?width=50&height=70&cropmode=none",
        2: "https://sat02pap002files.storage.live.com/y4m7f_hebCjuIx4k-7-hZU8lokTqXM1ka0wKg9MvIEBFDp8_RB1jk-xHFqjy38UcMTZ0KL1epPEZcWVRNBHDZVwQsjF4uHrOhZEaT27350DK2__aFXg43sSxBkiN0Vhoje9TTUYl42IDq9R1QzEd4iGmvc4cUqR9xw95NGV2YuqTKrZAhYN1rOn9q1NHCKbggoG?width=50&height=70&cropmode=none"
    }

    

    return (
        <>
        <div id='full-map-container'>

        <LoadScript libraries = {lib} mapIds = {id}>
        
        
            
            
        <GoogleMap
        
            
            mapContainerStyle={mapStyles}
            zoom={13}
            tilt={45}
            options = {
                {mapId: "919771f94d285faa",
                 scrollwheel:"true",
                disableDefaultUI:"true"
                }}
            center={view}>
                {
                    properties.map(property => {
                        return(
                            
                            

                            
                            <Marker
                            icon={featureIcons[property.typeId]}
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
                            <Link to={`/properties/${selected.id}`}> <h2> {selected.name}</h2></Link>
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
