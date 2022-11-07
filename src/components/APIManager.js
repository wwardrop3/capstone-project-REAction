//purpose of this module is to handle all fetch calls by saving the calls to exported functions


export const dataSource = "https://capstone-reaction-server.herokuapp.com"

// "https://capstone-reaction-server.herokuapp.com"
// "http://localhost:8088"



//create function to return fetch call for users

export const retrieveUsers = () => {
    return fetch(`${dataSource}/users`)
        .then(res => res.json())
}



//create SendUser to return POST fetch call to add new user

export const sendUser = (userObject) => {
    const fetchOptions = {
        methods: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    }
    return fetch(`${dataSource}/users`, fetchOptions)
}

//create getUser function to return a single user using a passed-in id
export const retriveUser = (id) => {
    return fetch(`${dataSource}/users/${id}`)
        .then(res => res.json())
}

//create deleteUser function that will remove a user object of the id that is passed in
export const deleteUser = (id) => {
    return fetch(`${dataSource}/users/${id}`, { method: "DELETE" })
        .then(res => res.json())
}


//create getProperties function that will use a get FetchCall to return all properties with a specific userId
//below filters the the fetch call to only the objects of the user that is signed in and then passes it into the set user state
// setServiceTickets(userTickets.filter(serviceTicket => serviceTicket.customerId === parseInt(localStorage.getItem("honey_customer"))))
export const GetProperties = () => {
    return fetch(`${dataSource}/properties?_expand=status&_expand=type&_expand=neighborhood&_expand=state&_expand=city&_expand=status`)
        .then(res => res.json())

}


export const retrieveRandomImages = () => {
    return fetch(`${dataSource}/randomSiteImages`)
        .then(res => res.json())
}

export const getNeighborhoods = () => {
    return fetch(`${dataSource}/neighborhoods`)
        .then(res => res.json())
}

export const getStates = () => {
    return fetch(`${dataSource}/states`)
        .then(res => res.json())
}

export const getCities = () => {
    return fetch(`${dataSource}/cities`)
        .then(res => res.json())
}

export const sendProperty = (propertyObject) => {
    const newProperty =

    {
        name: propertyObject.name,
        userId: propertyObject.userId,
        street: propertyObject.street,
        stateId: propertyObject.stateId,
        cityId: propertyObject.cityId,
        zipCode: propertyObject.zipCode,
        neighborhoodId: propertyObject.neighborhoodId,
        avgSF: propertyObject.avgSF,
        avgRent: propertyObject.avgRent,
        developer: propertyObject.developer,
        management: propertyObject.management,
        totalSF: propertyObject.totalSF,
        stories: propertyObject.stories,
        imageURL: propertyObject.imageURL,
        typeId: propertyObject.typeId,
        industry: propertyObject.industry,
        statusId: propertyObject.statusId,
        occupancy: propertyObject.occupancy,
        location: propertyObject.location
    }

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProperty)
    }
    return fetch(`${dataSource}/properties`, fetchOptions)
}

export const getPropertyTypes = () => {
    return fetch(`${dataSource}/types`)
        .then(res => res.json())
}

export const getStatuses = () => {
    return fetch(`${dataSource}/statuses`)
        .then(res => res.json())
}

export const retrieveProperty = (id) => {
    return fetch(`${dataSource}/properties/${id}?_expand=type&_expand=neighborhood&_expand=state&_expand=city&_expand=status`)
        .then(res => res.json())
}

export const getPropertyType = (typeId) => {
    return fetch(`${dataSource}/types/${typeId}`)
        .then(res => res.json())
}

export const removeProperty = (propertyId) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(`${dataSource}/properties/${propertyId}`, fetchOptions)
}

export const updateProperty = (propertyObject) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyObject)
    }
    return fetch(`${dataSource}/properties/${propertyObject.id}`, fetchOptions)
}

export const getPropertyClasses = () => {
    return fetch(`${dataSource}/propertyClasses`)
        .then(res => res.json())
}

export const getUserNotes = () => {
    return fetch(`${dataSource}/userNotes`)
        .then(res => res.json())
}

export const sendUserNote = (object) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }

    return fetch(`${dataSource}/userNotes`, fetchOptions)
}

export const deleteUserNote = (userNoteId) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(`${dataSource}/userNotes/${userNoteId}`, fetchOptions)
}






export const sendPropertyTask = (object) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }

    return fetch(`${dataSource}/propertyTasks`, fetchOptions)
}

export const getPropertyTasks = () => {
    return fetch(`${dataSource}/propertyTasks`)
        .then(res => res.json())
}

export const deleteTask = (taskId) => {
    const fetchOptions = {
        method: "DELETE",
    }
    return fetch(`${dataSource}/propertyTasks/${taskId}`, fetchOptions)
}

export const updateTask = (taskObject) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObject)
    }

    return fetch(`${dataSource}/propertyTasks/${taskObject.id}`, fetchOptions)
}



// export const getArticles = (website) => {
//     return fetch(website)
//     .then(html => html.text())
// }

export const sendPropertyFloorplan = (floorPlanObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(floorPlanObject)
    }

    return fetch(`${dataSource}/MFPropertyFloorplans`, fetchOptions)
}


export const getMFPropertyFloorplans = () => {
    return fetch(`${dataSource}/MFPropertyFloorplans`)
        .then(res => res.json())
}

export const updatePropertyFloorplan = (floorplanObject) => {
    console.log(floorplanObject)
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(floorplanObject)
    }

    return fetch(`${dataSource}/MFPropertyFloorplans/${floorplanObject.id}`, fetchOptions)
}

export const deleteFloorplan = (floorplanId) => {
    const fetchOptions = {
        method: "DELETE",
    }
    return fetch(`${dataSource}/MFPropertyFloorplans/${floorplanId}`, fetchOptions)
}



export const getMFUnitSizes = () => {
    return fetch(`${dataSource}/MFUnitSizes`)
        .then(res => res.json())
}


export const getMFRents = () => {
    return fetch(`${dataSource}/MFUnitRents`)
        .then(res => res.json())
}




export const sendMFUnitRent = (rentObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rentObject)
    }

    return fetch(`${dataSource}/MFUnitRents`, fetchOptions)
}


export const deleteMFUnitRent = (MFRentId) => {
    const fetchOptions = {
        method: "DELETE",
    }
    return fetch(`${dataSource}/MFUnitRents/${MFRentId}`, fetchOptions)
}