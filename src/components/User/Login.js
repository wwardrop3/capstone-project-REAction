//The purpose of this component is to automatically check if a user is already signed on, if so, redirect to home page, if not, direct user to registration page



import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import { dataSource } from "../APIManager";




export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`${dataSource}/users?email=${email}`)
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
                        <img className="site-logo" src = "https://sat02pap002files.storage.live.com/y4mYSlaorKyWp_j-ICkpT94JlxvflsTtk8qsWVycKiQBoEWHmUg4rGkC1IKO-bX4p3clO9Y8LM1YT5n34d6K44uZDb0vgGOLu1-2-427WSxPTB66Zwhuy-nO0kW5jvg3K1NeMLCamVE_q4w7KOO_8AO3R6eWpprmoqV8ltuc6pjupDD6d8pAHyV0ug42LRVFF8M?width=857&height=371&cropmode=none"></img>
                    </div>  
                    
                    
                </div>
                <div >
                    
                    
                </div>
                    <h2>Please sign in</h2>
                    
         
                    <fieldset>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email Address"
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
