import React, { useState, useContext, SyntheticEvent } from 'react';
import {UserContext} from '../context/UserContext';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup,InputGroupText, Row } from 'reactstrap';  
import { RouteComponentProps } from 'react-router-dom';

function LoginPage({history}: RouteComponentProps){
    const {login} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        setError(false);
        try{
            e.preventDefault();
            if(login){
                await login(username, password);
            }
            history.push("/");
        }
        catch(error){
            setError(true);
        }
    }

    return (
        <div className="app flex-row align-items-center">  
		    <Container>  
			    <Row className="justify-content-center">  
                    <Col md="12" lg="10" xl="8">  
                        <Card className="mx-4">  
                            <CardBody className="p-4">  
                                <Form onSubmit={handleSubmit}>  
                                    <h1>Login</h1>  
                                    <InputGroup className="mb-3">  
                                        <InputGroupText>Username</InputGroupText>
                                        <Input type="email" onChange={e => setUsername(e.target.value)} required/>  
                                    </InputGroup>  
                                    <InputGroup className="mb-3">  
                                        <InputGroupText>Password</InputGroupText>
                                        <Input type="password" onChange={e => setPassword(e.target.value)} required/>
                                    </InputGroup>  
                                    <CardFooter className="p-4">  
                                        <Button type="submit" className="btn btn-info mb-1" block><span>Login</span></Button>  
                                    </CardFooter>  
                                    {
                                        error && <div style={{color: `red`}}>Invalid username/password</div>
                                    }
                                </Form>  
                            </CardBody>  
                        </Card>  
                    </Col>  
                </Row>  
			</Container>  
		</div>   
    );
  };
    
export default LoginPage;