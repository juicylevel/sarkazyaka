import React from 'react';
import { FormGroup, InputGroup, Button } from 'react-bootstrap';
import IconLabel from '../common/IconLabel';

const SplittedNavButton = ({ text, icon, optionIcon, onClick, onOption }) => (
    <FormGroup className="splitted-nav-button">
        <InputGroup>
            <InputGroup.Button>
                <Button className="main-button" onClick={ onClick }>
                    <IconLabel icon={ icon } text={ text } />
                </Button>
            </InputGroup.Button>
            <InputGroup.Button>
                <Button onClick={ onOption }>
                    <IconLabel icon={ optionIcon } />
                </Button>
            </InputGroup.Button>
        </InputGroup>
    </FormGroup>
)

export default SplittedNavButton;