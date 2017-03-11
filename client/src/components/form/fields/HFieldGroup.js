import React from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';

const HFieldGroup = ({ label, info, children }) => (
    <FormGroup>
        <Row>
            <Col sm={2}>{ label }</Col>
            <Col sm={10}>{ children }</Col>
        </Row>
    </FormGroup>
);

export default HFieldGroup;