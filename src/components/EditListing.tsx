import React, {useState, useEffect, useContext, SyntheticEvent} from 'react';
import axios from 'axios';
import {API_URL} from '../utils/urls';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import {RatesContext} from '../context/RatesContext';

type RouteParams = {id: string};

function EditListing({match, history}: RouteComponentProps<RouteParams>) {

    const {rates} = useContext(RatesContext);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState('')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try{
            const loadListing = async () => {
                    const res = await axios({
                        method: 'GET',
                        url: `${API_URL}/${match.params.id}`,
                    })
                
                    setName(res.data.name)
                    setDescription(res.data.description)
                    setPrice(res.data.price)
                    setCurrency(res.data.currency)
                    setLoading(false)
            };

        loadListing();
        }
        catch(error){
             setError(true);
        }
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            const res = await axios({
                method: 'PUT',
                url: `${API_URL}/${match.params.id}`,
                data: {
                    name,
                    description,
                    price,
                    currency
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
						<h1>Edit List</h1>  
						<InputGroup className="mb-3">  
						    <Input value={name} placeholder="Enter a name" onChange={e => setName(e.target.value)} required/>  
						</InputGroup>  
						<InputGroup className="mb-3">  
						    <Input value={description} placeholder="Enter description" onChange={e => setDescription(e.target.value)}/>
						</InputGroup>  
						<InputGroup className="mb-3">  
						    <Input type="number" step="0.01" value={price} onChange={e => setPrice(parseInt(e.target.value))} min="1"/> 
						</InputGroup>  
						<InputGroup className="mb-4"> 
							<InputGroupText>Currency</InputGroupText> 
						    <select onChange={e => setCurrency(e.target.value)}>
								{Object.keys(rates).map(label => (
									<option value={label} selected={label === currency}>{label}</option>
								))}
							</select>
						</InputGroup>   
					 
				    <CardFooter className="p-4">  
					<Row>  
						<Col xs="12" sm="6">  
						    <Button type="submit" className="btn btn-info mb-1" block disabled={loading}>Update</Button>
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
export default EditListing;