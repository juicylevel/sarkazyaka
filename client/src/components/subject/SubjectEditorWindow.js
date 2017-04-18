import React from 'react';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import SubjectForm from './SubjectForm';
import BusyButton from '../common/BusyButton';
import { saveSubject, closeSubject } from '../../actions/subject';

const SubjectEditorForm = connect(
    state => ({
        initialValues: state.subject.data
    })
)(SubjectForm);

const SubjectEditorWindow = ({ show, subject, submitting, handleSaveButton, handleSave, handleClose }) => (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            <Modal.Title>{ subject.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SubjectEditorForm onSubmit={ handleSave} />
        </Modal.Body>
        <Modal.Footer>
            <BusyButton 
                bsStyle="info" 
                disabled={ submitting } 
                busy={ submitting }
                text="Сохранить"
                progressText="Сохранение..."
                icon="save"
                onClick={ handleSaveButton } 
            />
            <Button onClick={ handleClose }>Отмена</Button>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state) => ({
    subject: state.subject,
    submitting: isSubmitting('subjectForm')(state)
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