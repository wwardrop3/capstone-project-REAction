import { Link } from "react-router-dom"

export const Nav = () => {
    return (
        <li>
            <Link to={"/test-locations"}>Test Locations</Link>
        </li>
    )
}