import React, { useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, MarkerProps, useGoogleMap} from '@react-google-maps/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import"./style.css"
/*global google*/

const id = ["919771f94d285faa"]
const key= process.env.REACT_APP_GOOGLEMAPS_APIKEY
const lib = ["places"]





export const PropertyMap = ({properties, highlight, setHighlight, markerHighlight}) => {
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
   
    const handleEvent = () => {
        console.log("event handled")
    }

    const isSelected = (propertyId, markerHighlight) => {
        if(markerHighlight === propertyId){
            return [3,"yellow", 3, 3]
        } else {
            return [2,"", .8, 1]
        }
    }

  
    

    const mapStyles = {        
    height: "100%",
    width: "100%",
    }

   
    
    const featureIcons = {
        1:"https://sat02pap002files.storage.live.com/y4mu2sACHqDr5jRLN7sirMslkPKWttD3jIDV69Svn-rWxyZm_tSc5wff-K4G_G2TqzfSoTq4BecxrN1y6HhASjmFj_Tp5jPbaZ_zqdrGXNnduQ_w6PcpKCcGesNqRi7O7yfzx9kygL_xXUXt4fMJ0ov7wmYi_slhpmoo4X1MogbhyXjLF3xGdI1ZX-AE6GAXkHa?width=70&height=70&cropmode=none",
        2:"https://sat02pap002files.storage.live.com/y4msm91Dylq9IvhSQW7SgZxHm7BzazWUUzOL9XKL_2MUPsNoau-chcOsyv05pznb_FnxbER7QquCxtx8lCmxtaeQeNx7QVZzSF1iKMCzMb4Ub_aabPoC3r8l7vMiHurXHKl0u6ywEozi1WOmMJtx1O4rzANf3RcSh3nswthCAphZoTWdAqrPPRGWCjWf85Huhc_?width=70&height=70&cropmode=none",
        3:"https://sat02pap002files.storage.live.com/y4mSRoZjbt61CoNrmhhpOHNdGO4tnRSWySPG1Bg6HxSzWrSyQGKY_6CbAIovqRAo0PKllaqxh0l7KUtcMi1YQUOHw79wdqYPJFbC_LSli_THiGXe27m6GYLqIsSGQxBzulbA0dmcR5spg0rf7YoOQOdy10ybfy8dXVcF2nNTeB0K5kNXerjCWfF5G1245GRskfs?width=70&height=70&cropmode=none",
        4:"https://sat02pap002files.storage.live.com/y4mvaM6LN4gRNpxTNLDP-uw0gQzkBfxWDemC8u5T5-DgcLKHftAhtUbnWV_W1TEhJPsxnCy6i2BUDBYQaGU5PbICIg8s9ryKAKrqum1RPF8bVIP1RO8NYfz3xDwUvTRt3OmLuuO8W95kLSQgtMtTI_l7gOXFP0pbkREo4gTCxExkFCSnnzbfEH9eWB7HJCjZVwV?width=70&height=70&cropmode=none",
        5:"https://sat02pap002files.storage.live.com/y4mzjiT-UFvvImq8I0qqpFXzj37zN04xLoA7jSRUjsSg4DvmlRQ3jBXeQ4rlmWnRXo03wZw-zry3I2T5KkWIzlN5US6qKZj54ZrISZks1KAL0FFqCnAYN_5bjbUtkzxkLp8MaD8-kxXojUbSc0MHN3B3-uVLrqdxbUkWz7uPYh0VVAeuBZORTRGuPYWiYqW-asq?width=70&height=70&cropmode=none"
    }

    const colors = {
        1:"red",
        2:"orange",
        3:"blue",
        4:"green",
        5:"lightBlue"
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
                            
                            
                            // icon={featureIcons[property.statusId]}
                            
                            <Marker
                        
                            icon={{
                                path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
                                fillColor: colors[property.statusId],
                                fillOpacity: isSelected(property.id, markerHighlight)[2],
                                strokeWeight: isSelected(property.id, markerHighlight)[3],
                                scale: isSelected(property.id, markerHighlight)[0],
                                strokeColor: isSelected(property.id, markerHighlight)[1],
                                // anchor: new google.maps.Point(4,15)
                                
                                
                                
                                
                            }}
                            class = "marker"
                            key = {property.id} 
                            position = {property.location}
                            onClick={() => 
                                onSelect(property)
                            }
                            onMouseOver={
                                () => {
                                    setHighlight(property.id)
                                }
                            }
                            onMouseOut={
                                () => {
                                    setHighlight("")
                                }
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
                                    <img id='prop-image' src = {selected.imageURL} height="150px"></img>
                                
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
