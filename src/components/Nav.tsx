import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {UserContext} from '../context/UserContext';


export default () => {
    const {user} = useContext(UserContext);
    const username = user.user.email;
    return (
    <nav className="btn btn-warning navbar navbar-expand-lg navheader" >
        <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">    
                <li className="nav-item">  
                    <NavLink to="/" className="nav-link">
                     View all
                    </NavLink>
                </li>
                <li className="nav-item">  
                    <NavLink to="/create" className="nav-link">
                     Create
                    </NavLink>
                
                </li>
            </ul>
            <span>{username}</span>
        </div>
    </nav>
        
    )
}