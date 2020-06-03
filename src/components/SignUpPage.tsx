import React, { useState, useContext, SyntheticEvent } from 'react';
import {UserContext} from '../context/UserContext';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup,InputGroupText, Row } from 'reactstrap';  
import { RouteComponentProps } from 'react-router-dom';

function SignUpPage({history}: RouteComponentProps){
    const {signUp} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPass] = useState('');
    const [error, setError] = useState(false);


    const handleSubmit = async (e: SyntheticEvent) => {
        setError(false);
        try{
            e.preventDefault();
            if(!(password === confirmpassword)){
                alert("Password doesn't match");
                return;
            }
            if(signUp){
                await signUp(email, password);
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
                                    <h1>Sign up</h1>  
                                    <InputGroup className="mb-3">  
                                        <InputGroupText>Email</InputGroupText>
                                        <Input type="email" onChange={e => setEmail(e.target.value)} required/>  
                                    </InputGroup>
                                    <InputGroup className="mb-3">  
                                        <InputGroupText>Password</InputGroupText>
                                        <Input type="password" onChange={e => setPassword(e.target.value)} required/>
                                    </InputGroup> 
                                    <InputGroup className="mb-3">  
                                        <InputGroupText>Confirm Password</InputGroupText>
                                        <Input type="password" onChange={e => setConfirmPass(e.target.value)}/>
                                    </InputGroup> 
                                    <CardFooter className="p-4">  
                                        <Button type="submit" className="btn btn-info mb-1" block><span>Sign Up</span></Button>  
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
        
    );
  };
    
export default SignUpPage;