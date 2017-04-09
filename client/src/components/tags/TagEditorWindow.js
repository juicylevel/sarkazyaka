import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import TagForm from './TagForm';

// TODO
import { connect } from 'react-redux'
import { submit } from 'redux-form'
//

const EditThemeForm = connect(
    state => ({
        initialValues: state.editedTag
    })
)(TagForm);

const TagEditorWindow = ({ tag, show, title, onSave, onClose, handleChange, dispatch }) => (
    <Modal show={ show } onHide={ onClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditThemeForm onSubmit={ (values) => console.log('submit', values) } onChange={ handleChange } />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ () => dispatch(submit('tagForm')) }>Сохранить</Button>
            <Button onClick={ onClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state) => ({
    editedTag: state.editedTag
});

const mapDispatchToProps = (dispatch) => ({
    handleChange: (values, d, props) => {
        console.log('handleChange');
        dispatch(submit('tagForm'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TagEditorWindow);