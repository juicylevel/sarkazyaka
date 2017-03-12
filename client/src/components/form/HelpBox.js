import React from 'react';
import { InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';

const HelpBox = ({ children, help }) => (
    <InputGroup>
        { children }
        <OverlayTrigger trigger={ ['hover', 'focus', 'click'] } placement="left" overlay={
            <Popover id="help-popover" className="help-popover">{ help }</Popover>
        }>
            <InputGroup.Addon className="field-help">
                <i className="fa fa-question" />
            </InputGroup.Addon>
        </OverlayTrigger>
    </InputGroup>  
);

export default HelpBox;