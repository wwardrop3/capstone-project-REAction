//The purpose of this component is to product the nav bar that will be consistent across the entire app
import "./Nav.css"
import { Link } from "react-router-dom"
import { deleteUser, getPropertyTypes } from "../APIManager"
import { useHistory } from "react-router-dom"
import { appLogo } from "../REAction"
import { useEffect, useState } from "react"



export const NavBar =() => {
    const[propertyTypes, setPropertyTypes] = useState([])
    const [typeId, setTypeId] = useState()
    


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
                    <Link to = "/dashboard"><img className="nav-logo" src="https://sat02pap002files.storage.live.com/y4mN3_AEjAlNtDnXFUSi2Tgw-wak_ldsMKZ2ZnW5DdJbaXRPcWB9vQu966BzN8xmJ4YopyOztvVYVAJKXDUboAN1mrgKXvF5rvKSiXla3ejFg_fONPaevu-BK9BB8VdwFWZSx2C3F_Nr0PwRWsQAiaHTd8maK2FjZLT_81DP6cFiST32i63CcD6kN42ZM7wh9r_?width=852&height=371&cropmode=none"/></Link>                        
                </div>  

                <div className="nav-buttons">


                    <div className="view-filter">
                        <button name = "dashboard" className="nav-button"
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
                

                
                    <div className="view-filter">
                        <button name = "view-properties" className="nav-button"
                            onClick={
                                (evt) => {
                                    history.push(`/properties`)
                                    
                                }
                            }>Property Map
                        </button>
                    </div>

                    
    
                    <div className="view-filter">
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
                                <option value = "0">Add by Type</option>
                            {propertyTypes.map(type => {
                                return <option value = {`${type.id}`}>{`${type.name}`}</option>})}   
                            </select>
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
                    
                    <div className="view-filter">
                        
                        <button className="nav-button"

                        onClick={
                            (evt) => {
                                history.push("/user-notes/map")

                            }
                        }>Notes</button>
                    </div>



                    <div className="view-filter">
                        <button className="nav-button"

                        onClick={
                            (evt) => {
                                localStorage.removeItem("property_user")
                                history.push("/login")

                            }
                        }>Log Out</button>
                    </div>
            </div>




                        
                        
                
                
            </div>
    </>
)
}
