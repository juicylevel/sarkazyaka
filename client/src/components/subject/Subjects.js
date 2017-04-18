import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubjects, editSubject } from '../../actions/subject';
import SubjectsList from './SubjectsList';
import Progress from '../common/Progress';
import { PageHeader } from 'react-bootstrap';
import { isEmpty } from '../../utils';

class Subjects extends Component {
    render () {
        const { subjects, handleSubjectClick } = this.props;
        const { loading, data } = subjects;

        let status; 
        if (loading) {
            status = <Progress text="загрузка списка тем..." />
        } else if (isEmpty(data)) {
            status = <span>ни одной темы пока не создано...</span>
        }

        return (
            <div>
                {/*<PageHeader>Темы</PageHeader>*/}
                <div style={ { borderBottom: '1px solid #cccccc', marginBottom: '10px' } }>
                    <h2>Темы</h2>
                    <div className="pull-right">{ status }</div>
                </div>
                <SubjectsList data={ data } onSubjectClick={ handleSubjectClick } />
            </div>
        );
    }

    componentDidMount () {
        const { handleDidMount } = this.props;
        handleDidMount();
    }
};

const mapStateToProps = (state) => ({
    subjects: state.subjects
});

const mapDispatchToProps = (dispatch) => ({
    handleDidMount: () => {
        dispatch(fetchSubjects());
    },
    handleSubjectClick: (id) => {
        dispatch(editSubject(id))
    }
});

Subjects = connect(
    mapStateToProps,
    mapDispatchToProps
)(Subjects);

export default Subjects;