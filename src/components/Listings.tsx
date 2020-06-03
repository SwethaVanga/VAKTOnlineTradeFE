import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {ListingType, RouteParams} from '../utils/types';
import {API_URL} from '../utils/urls';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';  
import {RatesContext} from '../context/RatesContext';
import {UserContext} from '../context/UserContext';
import {convertAmount} from '../utils/currencyConversion';

function DisplayList({history}: RouteComponentProps<RouteParams>) {
    // const history = useHistory();
    const [listings, setListings] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
    const {rates} = useContext(RatesContext);
    const {user} = useContext(UserContext);
    const userid = user.user.id;
    
    const [error, setError] = useState(false);

	const loadListings = async () => {
        try{
            setShowLoading(true);
            const res = await axios({
                method: 'GET',
                url: `${API_URL}?userid=${userid}`,
            })
            setListings(res.data);
            setShowLoading(false);
        }
        catch(error){
            setError(true);
        }
	};
        useEffect(() => {
        try{
            loadListings();
        }
        catch(error){
            setError(true);
        }
        }, []);

        const deleteListItem = async (id: number) => {  
            try{
                const res = await axios({
                    method: 'DELETE',
                    url: `${API_URL}/${id}`,
                })
                loadListings();
            }
        catch(error){
            setError(true);
        }
        };  

        const editListItem = (id: number) => {  
            history.push({
                pathname: '/edit/' + id
            });
		};  
    
    return (
            <div className="animated fadeIn">
                <Row>  
                    <Col>  
                        <Card>  
                            <CardHeader>  
                                <i className="fa fa-align-justify"></i>List of items 
                            </CardHeader>
							<CardBody>
							<Table hover bordered striped responsive size="sm">
							<thead>  
                                <tr>  
                                    <th>Name</th>  
                                    <th>Description</th>  
                                    <th>Price</th>  
                                    <th>Trade currency</th>  
									<th>Reporting currency(GBP)</th>
                                </tr>  
                            </thead>
							<tbody> 
							    {listings.map((listing: ListingType) => (
                                    <tr>
										<td>{listing.name}</td> 
										<td>{listing.description}</td>
										<td>{listing.price}</td>
										<td>{listing.currency}</td>
										<td>{convertAmount(listing.currency, listing.price, rates)}</td>
                                        <td>  
                                            <div className="btn-group"> 
                                                <button className="btn btn-warning" onClick={() => { editListItem(listing.id) }}>Edit</button> 
                                                <button type="submit" className="btn btn-warning" onClick={() => { deleteListItem(listing.id) }}>Delete</button>  
											</div>
										</td>
                                    </tr>
                                ))} 
                            </tbody>
                           
							</Table>
                                {
                                    error && <div style={{color: `red`}}>Request Failed</div>
                                } 
							</CardBody> 
						</Card>
					</Col>  
                </Row>   
            </div>

    )
}

export default DisplayList;