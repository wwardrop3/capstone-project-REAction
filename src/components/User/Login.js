//The purpose of this component is to automatically check if a user is already signed on, if so, redirect to home page, if not, direct user to registration page



import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { appLogo } from "../REAction";
import "./Login.css"




export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("property_user", exists.id)
                    history.push("/dashboard")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section className="loginPage">
                <form className="form--login" onSubmit={handleLogin}>
                    
                <div className="login-images-container">
                   
                    
                    <div className="login-site-logo">
                        <img className="site-logo" src = "https://sat02pap002files.storage.live.com/y4mN3_AEjAlNtDnXFUSi2Tgw-wak_ldsMKZ2ZnW5DdJbaXRPcWB9vQu966BzN8xmJ4YopyOztvVYVAJKXDUboAN1mrgKXvF5rvKSiXla3ejFg_fONPaevu-BK9BB8VdwFWZSx2C3F_Nr0PwRWsQAiaHTd8maK2FjZLT_81DP6cFiST32i63CcD6kN42ZM7wh9r_?width=852&height=371&cropmode=none"></img>
                    </div>  
                    
                    <div className="login-property-images">
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4mdpiCEBMXmOVfAfOQSGAU4Z_A9qTFIsEEJkd8V8R1_eLA6K_IBMomwUbA7m-HDu71Nt2kUBtVQO4yg2A49zEo5rDECfug-ZbSq9OyvARuLH2DqMkEFjQd8JzCF6IN20QjZ6xiVpDwTeFWK5tQE7rUamixeP3g4R0FWlTfkqvj-juS2cKLa5rCzVjWvqCxYh9k?width=1024&height=746&cropmode=none"></img>
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4mjQma7DYGzMJUL3OS3smWKRCDGPyoklX-nuu2zmKvrlBHsc6-LRmj7AZLabhzyIBfOzWS6McCB_DvEdtLPg_NGzSJNoSfR3naTVkRUmZTXtWCKWrkDjTnrNX39ppHA_tI-9PkQmFVSvP51O13j3DDlQA3VC77X7Y53iHj0HUgmZqPA-uXG5cHuNizrbQUPSI2?width=1024&height=746&cropmode=none"></img>
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4m_wNYXsc45PtlXU6p8TMWV7mkeNCLXE1PgLMdRCxBtWj_2_LMXZ78w49GU5z02_rRenI2SIa94Qv_VAiRNQYC5fIP6QqcSO7weAd_8HQ264nm5Y6FGn3PcQZ8FmRrarE6X7OqMyBq98HqvgCGrkvjHJ5pmVoseqlt0xav_wCS1B8irrSwsbEMMHByMsDDVcjY?width=1024&height=746&cropmode=none"></img>
                        
                    </div>
                    
                </div>
                <div >
                    
                    
                </div>
                    <h2>Please sign in</h2>
                    
         
                    <fieldset>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                        
                    </fieldset>
                    <Link to="/register">Not a member yet?</Link>
                    
                </form>
            </section>
            
        </main>
    )
}





//purpose of component is serve as user login page that displays email address
//,sign in button and not a member sign up link that will direct to UserForm
//this will be the first page a user will see when they access the application

// import { Link } from "react-router-dom";


// //create the component function "User" that will return a display image, a user sign, a signin button, and a member registration link

//     //create useState variable "users" and "setUsers" to store all users in order to check if user already exists
//     //create useState variable "user" and "setUser"

//     //import function "getUsers" from APIManager and save to variable

//     //create useEffect function to call getUsers and save them to users state


//     return(

//         <div className="loginPage">
//             <img>Site Cover image</img>
//             <h1>REaction logo that will go ontop of the image</h1>
//             <fieldset className = "login">
//                 <label>Enter User Email Address</label>  
//                 <input>Enter Email</input>
//                 <button>Sign In</button>  
//             </fieldset>

//             //link will use useHistory to redirect url to registration page
//             <Link>Not a member?</Link>
//         </div>
 
//     )
        






//box below the image
//under the sign in text box, display a button that will submit the sign in
//at the bottom of the page, create a link that will create a new user if clicked on