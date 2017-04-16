import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import SubjectForm from './SubjectForm';
import IconLabel from '../common/IconLabel';
import { saveSubject, closeSubject } from '../../actions/subject';

const SubjectEditorForm = connect(
    state => ({
        initialValues: state.subject.data
    })
)(SubjectForm);

const SubjectEditorWindow = ({ show, subject, handleSaveButton, handleSave, handleClose }) => (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ subject.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SubjectEditorForm onSubmit={ handleSave} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ handleSaveButton } bsStyle="info">
                <IconLabel icon="save" text="Сохранить" />
            </Button>
            <Button onClick={ handleClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state) => ({
    subject: state.subject
});

const mapDispatchToProps = (dispatch) => ({
    handleSaveButton: () => dispatch(submit('subjectForm')),
    handleSave: (values) => dispatch(saveSubject(values)),
    handleClose: () => dispatch(closeSubject())
});

SubjectEditorWindow.defaultProps = {
    show: false,
    subject: {
        data: {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditorWindow);