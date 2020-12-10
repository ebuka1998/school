import React from 'react'
import { Link } from 'react-router-dom'

const List = ({subject, date_created, id}) => {
    return (
        <div className="item" style={{marginBottom: '10px', marginTop: '10px'}}>
            <i className="large newspaper icon"></i>
            <div className="content">
                <Link className="header" to = {`/assignment/${id}`}>{subject}</Link><br/>
                <div className="description">{date_created}</div>
            </div>
        </div>
    )
}

export default List
