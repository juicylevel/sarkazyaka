import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecords } from '../actions';

const Records = ({ records, getRecords }) => (
    <div>
        <h2>Records</h2>
        <div>
            <button onClick={() => getRecords()}>Load</button>
        </div>
        <div>{records.map(record => <div key={record.id}>{record.name}</div>)}</div>
    </div>
);

const mapStateToProps = (state) => ({
    records: state.records
});

const mapDispatchToProps = (dispatch) => ({
    getRecords: bindActionCreators(getRecords, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);