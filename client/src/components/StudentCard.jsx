import React from 'react'
import {Link} from 'react-router-dom'

const StudentCard = ({id, image_url, name_of_student, age_of_student}) => {
    return (
        <div className="ui special cards">
        <div className="card">
              <div className="blurring dimmable image">
              <div className="ui dimmer">
                  <div className="content">
                  <div className="center">
                      <div className="ui inverted button">Add Friend</div>
                  </div>
                  </div>
              </div>
              <img src={image_url} alt={image_url}/>
              </div>
              <div className="content">
              <a className="header" href="/">{name_of_student}</a><br/>
              <div className="meta">
                  <span className="date">{age_of_student} years</span>
              </div>
              </div>
              <div className="extra content">
                <Link to = {`/${name_of_student}/${id}/update`}>
                  <i className="users icon"></i>
                  update
                </Link>
              </div>
          </div>
          </div>
    )
}

export default StudentCard
