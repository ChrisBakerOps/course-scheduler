import {NavLink} from "react-router-dom";

function NavBar(){
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3 px-3">
            <div className="container-fluid">
                <span className="navbar-brand">Course Scheduler</span>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;