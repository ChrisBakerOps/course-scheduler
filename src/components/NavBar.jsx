import {Link} from "react-router-dom";

function NavBar(){
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3 px-3">
            <span className="navbar-brand">Course Scheduler</span>
            <Link className="nav-link text-white px-3" to="/">Home</Link>
            <Link className="nav-link text-white px-3" to="/about">About</Link>
        </nav>
    )
}
export default NavBar;