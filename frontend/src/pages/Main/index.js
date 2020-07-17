import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container } from 'reactstrap'
import Navbar from 'components/Navbar'
import Restaurants from 'containers/Restaurants'
import Users from 'containers/Users'

import authActions from 'redux/auth/actions'

const Main = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('Restaurants')

  return (
    <div>
      <Navbar user={user} onClickMenu={id => setActiveTab(id)} onLogout={logout} />

      <Container className="mt-5">
        {activeTab === 'Restaurants' ? <Restaurants /> : <Users />}
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.Auth.user,
})

const mapDispatchToProps = {
  logout: authActions.signoutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
