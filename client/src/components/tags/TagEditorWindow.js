import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import TagForm from './TagForm';

const TagEditorWindow = ({ show, title, handleClose }) => (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TagForm />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ handleClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

export default TagEditorWindow;