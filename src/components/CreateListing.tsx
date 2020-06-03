import React, {useState, useContext, SyntheticEvent} from 'react';
import axios from 'axios';
import {API_URL} from '../utils/urls';
import { RouteComponentProps } from 'react-router-dom';
import {RatesContext} from '../context/RatesContext';
import {UserContext} from '../context/UserContext';

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup,InputGroupText, Row } from 'reactstrap';  

export default ({history}: RouteComponentProps) => {

	const {rates} = useContext(RatesContext);
	const {user} = useContext(UserContext);
	const userid = user.user.id.toString();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)
	const [currency, setCurrency] = useState('GBP')

    const [error, setError] = useState(false);
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
		
		try{
			const res = await axios({
				method: 'POST',
				url: API_URL,
				data: {
					name,
					description,
					price,
					currency,
					userid
				}
			})
			history.push('/');
		}
		catch(error){
            setError(true);
        }
	}

	const onCancelClick = (e: SyntheticEvent) => {
        e.preventDefault();
        history.push('/');
	} 
	
    return (

	    <div className="app flex-row align-items-center">  
		    <Container>  
			    <Row className="justify-content-center">  
				<Col md="12" lg="10" xl="8">  
				<Card className="mx-4">  
					<CardBody className="p-4">  
					<Form onSubmit={handleSubmit}>  
						<h1>Create List</h1>  
						<InputGroup className="mb-3">  
							<InputGroupText>Name</InputGroupText>
							<Input  value={name} placeholder="Enter a name" onChange={e => setName(e.target.value)} required/>  
						</InputGroup>  
						<InputGroup className="mb-3">  
							<InputGroupText>Description</InputGroupText>
						    <Input value={description} placeholder="Enter description" onChange={e => setDescription(e.target.value)}/>
						</InputGroup>  
						<InputGroup className="mb-3">  
							<InputGroupText>Price</InputGroupText>
						    <Input type="number" step="0.01" value={price} onChange={e => setPrice(parseInt(e.target.value))} min="1"/> 
						</InputGroup>  
						<InputGroup className="mb-4"> 
							<InputGroupText>Currency</InputGroupText> 
						    <select onChange={e => setCurrency(e.target.value)} value={currency}>
								{Object.keys(rates).map(currency => (
									<option value={currency}>{currency}</option>
								))}
							</select>
						</InputGroup>  
						
				    <CardFooter className="p-4">  
					<Row>  
						<Col xs="12" sm="6">  
						    <Button type="submit" className="btn btn-info mb-1" block><span>Create</span></Button>  
						</Col>
						<Col xs="12" sm="6">  
                            <Button className="btn btn-info mb-1" block onClick={onCancelClick}><span>Cancel</span></Button>  
                        </Col>   
					</Row>  
					</CardFooter>  
					{
						error && <div style={{color: `red`}}>Please check the fields</div>
                    } 
					</Form>  
					</CardBody>  
				</Card>  
				</Col>  
			</Row>  
			</Container>  
		</div>   
       
    )
}