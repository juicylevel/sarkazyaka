import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTags, editTag } from '../../actions';
import { PageHeader } from 'react-bootstrap';
import TagsList from './TagsList';

class Tags extends Component {
    render () {
        const { tags, handleTagEdit } = this.props;
        return (
            <div>
                <PageHeader>Темы</PageHeader>
                <TagsList tags={ tags } onEdit={ handleTagEdit } />
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
        dispatch(fetchTags());
    },
    handleTagEdit: (id) => {
        dispatch(editTag(id))
    }
});

Tags = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);

export default Tags;