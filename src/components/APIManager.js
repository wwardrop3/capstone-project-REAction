//purpose of this module is to handle all fetch calls by saving the calls to exported functions

import { useEffect, useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const Component = () => (
    <div>
      <GooglePlacesAutocomplete
        apiKey= {REACT_APP_GOOGLEAPIKEY}
      />
    </div>
  );
  


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
export const GetProperties = (userId) => {

    const [userProperties, setUserProperties] = useState([])
    
    useEffect(
        () =>{

            return fetch(`http://localhost:8088/properties?_expand=type`)
            .then(res => res.json())
            .then((properties) =>{
                setUserProperties(properties.filter(property => property.userId === parseInt(localStorage.getItem("property_user"))))
               
        }
    )
},[]
)
    return userProperties

}


export const retrieveRandomImages = () => {
    return fetch("http://localhost:8088/randomSiteImages")
    .then(res => res.json())
}
