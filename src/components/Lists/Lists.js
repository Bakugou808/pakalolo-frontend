import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'


export const Lists = () => {
    return (
        <div>
            Lists Page
        </div>
    )
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Lists))

