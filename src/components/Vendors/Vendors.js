import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'


export const Vendors = () => {
    return (
        <div>
            VENDORS PAGE
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Vendors))
