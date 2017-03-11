import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import '../css/login.css';

const Login = () => (
    <Row className="login-box row-centered">
        <Col xs={12} md={12}>
            <div className="line">
                <h3>#сарказяка</h3>
            </div>
            <div className="outter">
                <img src="/nicolas-sarkozy-header.png" alt="#сарказяка" className="image-circle" />
            </div>   
            <h1>Привет!</h1>
        </Col>
        <Col xs={6} md={6} className="counter-box">
            <h3 className="counter-label">
                2 <br/> <span>ПОЛЬЗОВАТЕЛИ</span>
            </h3>
        </Col>
        <Col xs={6} md={6} className="counter-box">
            <h3 className="counter-label">
                387 <br/> <span>САРКАЗЯКИ</span>
            </h3>
        </Col>
        <Col xs={12} md={12} className="form-box">
            <form>
                <FormGroup>
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl type="email" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">LOGIN</Button>
                </FormGroup>
            </form>
        </Col>
       
    </Row>
);

export default Login;