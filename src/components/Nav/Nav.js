import { Link } from "react-router-dom"

export const Nav = () => {
    return (
        <>
            <li>
                <Link to={"/locations"}>Property Location Map</Link>
            </li>

            <li>
            <Link to={"/locations/map"}>Test Locations</Link>
            </li>
        
        </>
        
    )
}