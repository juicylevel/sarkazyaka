import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import TagForm from './TagForm';

const TagEditorWindow = ({ tag, show, title, onClose }) => (
    <Modal show={ show } onHide={ onClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TagForm tag={ tag } />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ onClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

export default TagEditorWindow;