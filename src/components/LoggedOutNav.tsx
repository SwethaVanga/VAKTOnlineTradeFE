import React from 'react';
import {NavLink} from 'react-router-dom';

export default () => (

    <nav className="btn btn-warning navbar navbar-expand-lg navheader" >
        <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">    
                <li className="nav-item">  
                    <NavLink to="/login" className="nav-link">
                     Login
                    </NavLink>
                </li>
                <li className="nav-item">  
                    <NavLink to="/" className="nav-link" exact>
                     Signup
                    </NavLink>
                
                </li>
            </ul>
        </div>
    </nav>
     
    
)