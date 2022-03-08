//Purpose of this component is to register user after being redirected from the Login component.  Component will create user object that will include and id, name, and email address that will be used to login


import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("property_user", createdUser.id)
                                history.push("/all-properties")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for REaction</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input onChange={updateUser} type="text" id="address" className="form-control" placeholder="Street address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}




//purpose of component is to produce form for user sign up

//create component function that display a user registration form that will accept their email, first name, and last name

    //create useState variables "user" and "setUser" and create object that has empty firstName, lastName, and email
    //create UseState variable for "siteImages" and "setSiteImages" and create empty object

    //import send user function from api manager

    // //create function that returns a random image from siteImages using rand.int
    // return(
       
    //         <img>random image</img>
    //         <h2>Register New User</h2>
    //         <fieldset>
    //             <label>Enter User First Name</label>
    //             <input>User First Name</input>
    //         </fieldset>
               

    //         <fieldset>
    //             <label>Enter User Last Name</label>
    //             <input>User Last Name</input>
    //         </fieldset>

    //         <fieldset>
    //             <label>Enter User Email Address</label>
    //             <input>User Email Address</input>
    //         </fieldset>

    //         //button will use onClick and useHistory to change url to homepage with new userId
    //         <button>Register User</button>

    // )