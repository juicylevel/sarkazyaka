import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubjects, editSubject } from '../../actions/subject';
import { PageHeader } from 'react-bootstrap';
import TagsList from './TagsList';

class Tags extends Component {
    render () {
        const { tags, handleSubjectClick } = this.props;
        return (
            <div>
                <PageHeader>Темы</PageHeader>
                <TagsList tags={ tags } onSubjectClick={ handleSubjectClick } />
            </div>
        );
    }

    componentDidMount () {
        const { handleDidMount } = this.props;
        handleDidMount();
    }
};

const mapStateToProps = (state) => ({
    tags: state.tags
});

const mapDispatchToProps = (dispatch) => ({
    handleDidMount: () => {
        dispatch(fetchSubjects());
    },
    handleSubjectClick: (id) => {
        dispatch(editSubject(id))
    }
});

Tags = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);

export default Tags;