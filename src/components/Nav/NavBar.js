//The purpose of this component is to product the nav bar that will be consistent across the entire app
import "./Nav.css"
import { Link } from "react-router-dom"
import { deleteUser } from "../APIManager"
import { useHistory } from "react-router-dom"
import { appLogo } from "../REAction"



export const NavBar =() => {

    const history=useHistory()

    return (
        <>
        <div className="nav-container">

            
            <div className="nav-logo">
                <img src="https://sn3302files.storage.live.com/y4mqZavKEpPnQLAKtZ9_Np2dSiDMn75dWnxPXrboSkSqHqZs2H--L5aAI505wKloT2D1go2ZC6zyG2lycNHXtrZvxQZ4M27g8XiG--F6rl-B5q3WasKmQuEBrTazibNc5boT1LmOu2XCZzbkjjSVF11a78on7I70_ciluH8KxiAj7Odj57Um7yb7BQfbJ8f1zjb?width=400&height=200&cropmode=none"></img>
            </div>

            <div className="nav-buttons">
                
                <button name = "allProperties" className="nav-button"
                        onClick={
                            (evt) => {
                                history.push(`/properties`)
                                

                            }
                        }>All Properties
                        </button>



                <button name = "multifamily" className="nav-button"
                onClick={
                    (evt) => {
                        history.push(`/properties/type/1`)
                        

                    }
                }>Multifamily</button>




                <button name = "office" className="nav-button"
                    onClick={
                        (evt) => {
                            history.push(`/properties/type/2`)
                            

                        }
                    }>Office
                    </button>


                <button name = "industrial" className="nav-button"
                    onClick={
                        (evt) => {
                            history.push(`/properties/type/3`)
                            

                        }
                    }>Industrial
                    </button>


                <button className="nav-button"
                onClick={
                    (evt) => {
                        localStorage.removeItem("property_user")
                        history.push("/login")

                    }
                }>Log Out</button>
                    
                    
                </div>
            
        </div>
        </>
)
}
