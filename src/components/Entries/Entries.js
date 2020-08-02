import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'


export const Entries = () => {
    return (
        <div>
            Entries PAGE
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Entries))
