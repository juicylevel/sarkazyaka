import React from 'react';
import { FormGroup, HelpBlock, Row, Col } from 'react-bootstrap';
import HelpBox from './HelpBox';

const HFieldGroup = ({ label, help, required, message, validationState, children }) => (
    <FormGroup validationState={ validationState }>
        <Row>
            <Col sm={2} className="field-label-align-left">
                { label }
                { required && <i className="fa fa-asterisk field-required" /> }
            </Col>
            <Col sm={10}>
                { help ? <HelpBox help={ help }>{ children }</HelpBox> : children }
                { message && <HelpBlock>{ message }</HelpBlock> }
            </Col>
        </Row>
    </FormGroup>
);

export default HFieldGroup;