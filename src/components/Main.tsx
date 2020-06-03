import React, {useContext, Fragment} from 'react';
import {UserContext} from '../context/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import LoggedOutNav from './LoggedOutNav'
import CreateListing from './CreateListing';
import EditListing from './EditListing';
import Listings from './Listings';
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage';

export default () => {
   const {user} = useContext(UserContext);
    return (
        <Fragment>         
            <Router>
			<div className="container">				
				<Switch>
                    {user && 
                    <Fragment>
                        <Nav />
                        <Route component={CreateListing} path="/create" />
                        <Route component={Listings} path="/" exact />
                        <Route component={EditListing} path="/edit/:id" />
                        {/* <Route component={ViewList} path="/:id" /> */}
                    </Fragment>
                    }
                    {!user && 
                    <Fragment>
                        <LoggedOutNav />
                        <Route component={LoginPage} path="/login" exact />  
                        <Route component={SignUpPage} path="/" exact />
                    </Fragment>
                    }
				</Switch>
				</div>
            </Router>
            
        </Fragment>
        

    )
}

