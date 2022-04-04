//The purpose of this component is to product the nav bar that will be consistent across the entire app
import "./Nav.css"
import { Link } from "react-router-dom"
import { deleteUser, getPropertyTypes, retriveUser } from "../APIManager"
import { useHistory } from "react-router-dom"
import { appLogo } from "../REAction"
import { useEffect, useState } from "react"
import { userInfo } from "os"



export const NavBar =() => {
    const[propertyTypes, setPropertyTypes] = useState([])
    const [typeId, setTypeId] = useState()
    const [user, setUser] = useState([])
    
    useEffect(
        () => {
            retriveUser(parseInt(localStorage.getItem("property_user")))
            .then(
                (userResponse) => {
                    setUser(userResponse)
                }
            )
        },[]
    )

    //Invoke GetProperties from the API manager to fetch all propertyType objects and then save to app state
    useEffect(
        () => {
            getPropertyTypes()
                .then(
                    (typesResponse) => {
                        setPropertyTypes(typesResponse)
                    }
                )
        },
        //anytime a user requests a different property type, rerun
        [typeId]
    )

    const history=useHistory()

    return (
        <>




            <div className="nav-container">

                <div className="site-logo-container">  
                    <Link to = "/dashboard"><img className="nav-logo" src="https://sat02pap002files.storage.live.com/y4mYSlaorKyWp_j-ICkpT94JlxvflsTtk8qsWVycKiQBoEWHmUg4rGkC1IKO-bX4p3clO9Y8LM1YT5n34d6K44uZDb0vgGOLu1-2-427WSxPTB66Zwhuy-nO0kW5jvg3K1NeMLCamVE_q4w7KOO_8AO3R6eWpprmoqV8ltuc6pjupDD6d8pAHyV0ug42LRVFF8M?width=857&height=371&cropmode=none"/></Link>                        
                </div>  

                <div className="nav-buttons">


                    <div className="view-filter dropdown">
                        <button name = "dashboard" className="dropbtn"
                            onClick={
                                (evt) => {
                                    history.push(`/dashboard`)
                                    

                                }
                            }>Dashboard
                        </button>
                    </div>



                    
                        
                        {/* <input
                        type="radio" 
                        name="view-select"
                        value={0}
                        className="nav-button"
                            onChange = {
                                (evt) => {
                                    if(evt.target.value === "All"){
                                        history.push("/properties")
                                    } else{
                                        const foundPropertyType = propertyTypes.find(type => type.id === parseInt(evt.target.value))
                                        history.push(`/properties/type/${foundPropertyType.id}`)
                                    }
                                    
                                }}
                                >

                                <li value = "All">All Properties</li>
                            {propertyTypes.map(type => {
                                return <li type = "radio" value = {`${type.id}`}>{`${type.name}`}</li>})}   
                        </input> */}
                

                
                    <div className="view-filter dropdown">
                        <button name = "view-properties" className="dropbtn"
                            onClick={
                                (evt) => {
                                    history.push(`/properties/type/0/status/0`)
                                    
                                }
                            }>Property Map
                        </button>
                    </div>

                    
    
                    

                
    {/* 
                    <div className="view-filter">

                        <button className="nav-button"

                        onClick={
                            (evt) => {
                                history.push("/create-user-note")

                            }
                        }>Create Note</button>
                    </div> */}
                    
                    <div className="view-filter dropdown">
                        
                        <button className="dropbtn"

                        onClick={
                            (evt) => {
                                history.push("/user-notes/map")

                            }
                        }>Notes</button>
                    </div>

                    {/* <div className="view-filter">
                        <select className="nav-button"
                        value={0}
                            onChange = {
                                (evt) => {
                                    setTypeId(parseInt(evt.target.value))
                                    const foundPropertyType = propertyTypes.find(type => type.id === parseInt(evt.target.value))
                                    const typeName = foundPropertyType.name
                                    history.push(`/properties/create/${foundPropertyType.id}`)
                                }}
                                >
                                <option value = "0">Add Property by Type</option>
                            {propertyTypes.map(type => {
                                return <option value = {`${type.id}`}>{`${type.name}`}</option>})}   
                            </select>
                    </div> */}

                    <div className="view-filter dropdown">
                        <button className="dropbtn"
                        
                                >Add Property</button>
                                <div className="dropdown-content">
                                {propertyTypes.map(type => {
                                    return <a value = {`${type.id}`}
                                    onClick = {
                                        (evt) => {
                                            setTypeId(parseInt(evt.target.value))
                                            const foundPropertyType = propertyTypes.find(type => type.id === parseInt(evt.target.value))
                                            const typeName = foundPropertyType?.name
                                            history.push(`/properties/create/${type.id}`)
                                        }}

                                    >{`${type.name}`}</a>})}   
                                </div>
                           
                    
                    </div>




                    <div className="view-filter dropdown">
                        <button className="dropbtn"

                        onClick={
                            (evt) => {
                                localStorage.removeItem("property_user")
                                history.push("/login")

                            }
                        }>Log Out {user.name}</button>
                    </div>
            </div>




                        
                        
                
                
            </div>
    </>
)
}
