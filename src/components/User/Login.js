//purpose of component is serve as user login page that displays email address
//,sign in button and not a member sign up link that will direct to UserForm
//this will be the first page a user will see when they access the application

import { Link } from "react-router-dom";


//create the component function "User" that will return a display image, a user sign, a signin button, and a member registration link

    //create useState variable "users" and "setUsers" to store all users in order to check if user already exists
    //create useState variable "user" and "setUser"

    //import function "getUsers" from APIManager and save to variable

    //create useEffect function to call getUsers and save them to users state


    return(

        <div className="loginPage">
            <img>Site Cover image</img>
            <h1>REaction logo that will go ontop of the image</h1>
            <fieldset className = "login">
                <label>Enter User Email Address</label>  
                <input>Enter Email</input>
                <button>Sign In</button>  
            </fieldset>

            //link will use useHistory to redirect url to registration page
            <Link>Not a member?</Link>
        </div>
 
    )
        






//box below the image
//under the sign in text box, display a button that will submit the sign in
//at the bottom of the page, create a link that will create a new user if clicked on