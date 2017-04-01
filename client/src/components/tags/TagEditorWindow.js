import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import TagForm from './TagForm';

// TODO
import { connect } from 'react-redux'
import { submit } from 'redux-form'
//

const TagEditorWindow = ({ tag, show, title, onSave, onClose, dispatch }) => (
    <Modal show={ show } onHide={ onClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TagForm tag={ tag } onSubmit={ (values) => console.log(values) } />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ () => dispatch(submit('tagForm')) }>Сохранить</Button>
            <Button onClick={ onClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

export default connect()(TagEditorWindow);