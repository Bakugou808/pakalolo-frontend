import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'


export const Collection = () => {
    return (
        <div>
            Collection Page
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Collection))
