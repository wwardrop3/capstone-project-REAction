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
                        <img className="site-logo" src = "https://sat02pap002files.storage.live.com/y4mYSlaorKyWp_j-ICkpT94JlxvflsTtk8qsWVycKiQBoEWHmUg4rGkC1IKO-bX4p3clO9Y8LM1YT5n34d6K44uZDb0vgGOLu1-2-427WSxPTB66Zwhuy-nO0kW5jvg3K1NeMLCamVE_q4w7KOO_8AO3R6eWpprmoqV8ltuc6pjupDD6d8pAHyV0ug42LRVFF8M?width=857&height=371&cropmode=none"></img>
                    </div>  
                    
                    {/* <div className="login-property-images">
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4mdpiCEBMXmOVfAfOQSGAU4Z_A9qTFIsEEJkd8V8R1_eLA6K_IBMomwUbA7m-HDu71Nt2kUBtVQO4yg2A49zEo5rDECfug-ZbSq9OyvARuLH2DqMkEFjQd8JzCF6IN20QjZ6xiVpDwTeFWK5tQE7rUamixeP3g4R0FWlTfkqvj-juS2cKLa5rCzVjWvqCxYh9k?width=1024&height=746&cropmode=none"></img>
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4mjQma7DYGzMJUL3OS3smWKRCDGPyoklX-nuu2zmKvrlBHsc6-LRmj7AZLabhzyIBfOzWS6McCB_DvEdtLPg_NGzSJNoSfR3naTVkRUmZTXtWCKWrkDjTnrNX39ppHA_tI-9PkQmFVSvP51O13j3DDlQA3VC77X7Y53iHj0HUgmZqPA-uXG5cHuNizrbQUPSI2?width=1024&height=746&cropmode=none"></img>
                        <img className="login-image" src = "https://sat02pap002files.storage.live.com/y4m_wNYXsc45PtlXU6p8TMWV7mkeNCLXE1PgLMdRCxBtWj_2_LMXZ78w49GU5z02_rRenI2SIa94Qv_VAiRNQYC5fIP6QqcSO7weAd_8HQ264nm5Y6FGn3PcQZ8FmRrarE6X7OqMyBq98HqvgCGrkvjHJ5pmVoseqlt0xav_wCS1B8irrSwsbEMMHByMsDDVcjY?width=1024&height=746&cropmode=none"></img>
                        
                    </div> */}
                    
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
