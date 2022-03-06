//the purpose of this page is to serve as the base application page 

import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./Nav/NavBar"
import { Login } from "./User/Login";
import { Register } from "./User/Register";


export const appLogo = "https://sn3302files.storage.live.com/y4mqZavKEpPnQLAKtZ9_Np2dSiDMn75dWnxPXrboSkSqHqZs2H--L5aAI505wKloT2D1go2ZC6zyG2lycNHXtrZvxQZ4M27g8XiG--F6rl-B5q3WasKmQuEBrTazibNc5boT1LmOu2XCZzbkjjSVF11a78on7I70_ciluH8KxiAj7Odj57Um7yb7BQfbJ8f1zjb?width=1613&height=261&cropmode=none"


export const REaction = () => {

    return(
    <>
    
    <Route
            render={() => {
              if (localStorage.getItem("property_user")) { //if the customer exists
                return (
                  <>
                    <NavBar />
                    <ApplicationViews />
                  </>
                );
              } else {
                return <Redirect to="/login"/>; //if the customer does not exist, goes to login component
              }
            }}
          />
      
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/register">
              <Register/>
          </Route>

    
    
    
    
    </>

    )}