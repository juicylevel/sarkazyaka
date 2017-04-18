import React from 'react';
import { connect } from 'react-redux';

const Records = ({ records, getRecords }) => (
    <div>
        <h2>Records</h2>
        <div>{ records.map(record => <div key={ record.id }>{ record.name }</div>) }</div>
    </div>
);

const mapStateToProps = (state) => ({
    records: state.records
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);