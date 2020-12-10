import React from 'react'

const StudentCard = ({image_url, name_of_student, age_of_student}) => {
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
              <a href="/">
                  <i className="users icon"></i>
                  update
              </a>
              </div>
          </div>
          </div>
    )
}

export default StudentCard
