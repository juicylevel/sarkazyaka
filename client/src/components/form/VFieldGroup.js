import React from 'react';
import { FormGroup } from 'react-bootstrap';
import HelpBox from './HelpBox';

const VFieldGroup = ({ label, help, children }) => (
    <FormGroup>
        <div className="field-label-align-top">{ label }</div>
        <div>{ help ? <HelpBox help={ help }>{ children }</HelpBox> : children }</div>
    </FormGroup>
);

export default VFieldGroup;