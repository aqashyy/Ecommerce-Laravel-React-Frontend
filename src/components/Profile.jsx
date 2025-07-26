import React from 'react'
import Layout from './common/Layout'
import UserSidebar from './common/UserSidebar'

function Profile() {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pd-3">
            <h3>My Account</h3>
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
