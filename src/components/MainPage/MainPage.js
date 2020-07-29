import { connect } from "react-redux";

import React, { Component, useState, useEffect } from 'react'
import StrainTable from './StrainTable'
import {fetchStrains} from '../../actions/strainActions'

class MainPage extends Component {

    
    state = {
        showTable: false,
    }

    componentDidMount(){
        const {onFetchStrains} = this.props 

        onFetchStrains()
    }
    render() {
        
        return (
            <div>
                {this.props.strains && <StrainTable strains={this.props.strains}/> }
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        strains: store.strains.allStrains
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStrains: () => {fetchStrains(dispatch)}
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)