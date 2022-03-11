//the purpose of this page is to serve as the base application page 

import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./Nav/NavBar"
import { Login } from "./User/Login";
import { Register } from "./User/Register";



export const REaction = () => {

    return(
    <>
    
    <Route
            render={() => {
              if (localStorage.getItem("property_user")) { //if the customer exists
                return (
                  <>
                  <div className="all-content">
                    <NavBar />
                    <ApplicationViews />
                  </div>
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