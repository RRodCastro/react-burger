import React, { Component } from 'react'

import { connect } from 'react-redux'
import { logOut } from '../../stores/actions'
import { Redirect } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logOut())
    }
}

class Logout extends Component {
    
    componentDidMount () {
        this.props.onLogout()
    }

    render () {

        return (
            <Redirect to="/" />
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout)