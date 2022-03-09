//purpose of this module is to handle all fetch calls by saving the calls to exported functions

import { useEffect, useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const key= process.env.REACT_APP_GOOGLEAPIKEY


//create function to return fetch call for users

export const retrieveUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
}



//create SendUser to return POST fetch call to add new user

export const sendUser = (userObject) => {
    const fetchOptions = {
        methods:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(userObject)
    }
    return fetch("http://localhost:8088/users", fetchOptions)
}

//create getUser function to return a single user using a passed-in id
export const retriveUser = (id) => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
}

//create deleteUser function that will remove a user object of the id that is passed in
export const deleteUser = (id) => {
    return fetch(`http://localhost:8088/users/${id}`, {method:"DELETE"})
    .then(res => res.json())
}


//create getProperties function that will use a get FetchCall to return all properties with a specific userId
    //below filters the the fetch call to only the objects of the user that is signed in and then passes it into the set user state
    // setServiceTickets(userTickets.filter(serviceTicket => serviceTicket.customerId === parseInt(localStorage.getItem("honey_customer"))))
export const GetProperties = () => {
    return fetch(`http://localhost:8088/properties?_expand=type&_expand=neighborhood&_expand=state&_expand=city&_expand=status`)
    .then(res => res.json())
            
}


export const retrieveRandomImages = () => {
    return fetch("http://localhost:8088/randomSiteImages")
    .then(res => res.json())
}

export const getNeighborhoods = () => {
    return fetch(`http://localhost:8088/neighborhoods`)
    .then(res => res.json())
    }

export const getStates = () => {
    return fetch("http://localhost:8088/states")
        .then(res => res.json())
}

export const getCities = () => {
    return fetch(`http://localhost:8088/cities`)
        .then(res => res.json())
}

export const sendProperty = (propertyObject) => {

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyObject)
    }
    return fetch("http://localhost:8088/properties", fetchOptions)
} 

export const getPropertyTypes = () => {
    return fetch("http://localhost:8088/types")
        .then(res => res.json())
}

export const getStatuses = () => {
    return fetch("http://localhost:8088/statuses")
        .then(res => res.json())
}

export const retrieveProperty = (id) => {
    return fetch(`http://localhost:8088/properties/${id}?_expand=type&_expand=neighborhood&_expand=state&_expand=city&_expand=status`)
    .then (res => res.json())
}

export const getPropertyType = (typeId) => {
    return fetch(`http://localhost:8088/types/${typeId}`)
        .then(res => res.json())
}

export const removeProperty = (propertyId) => {
    const fetchOptions={
        method: "DELETE"
    }
    return fetch(`http://localhost:8088/properties/${propertyId}`, fetchOptions)
    .then(res => res.json())
}

export const updateProperty = (propertyObject) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyObject)
    }
    return fetch(`http://localhost:8088/properties/${propertyObject.id}`, fetchOptions)
}
