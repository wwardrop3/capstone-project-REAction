//purpose of component is to produce form for user sign up

//create component function that display a user registration form that will accept their email, first name, and last name

    //create useState variables "user" and "setUser" and create object that has empty firstName, lastName, and email
    //create UseState variable for "siteImages" and "setSiteImages" and create empty object

    //import send user function from api manager

    //create function that returns a random image from siteImages using rand.int
    return(
       
            <img>random image</img>
            <h2>Register New User</h2>
            <fieldset>
                <label>Enter User First Name</label>
                <input>User First Name</input>
            </fieldset>
               

            <fieldset>
                <label>Enter User Last Name</label>
                <input>User Last Name</input>
            </fieldset>

            <fieldset>
                <label>Enter User Email Address</label>
                <input>User Email Address</input>
            </fieldset>

            //button will use onClick and useHistory to change url to homepage with new userId
            <button>Register User</button>

    )