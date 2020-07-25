import SearchBar from 'material-ui-search-bar'
import { connect } from "react-redux";

import React, { Component } from 'react'
import StrainTable from './StrainTable'
import {fetchStrains} from '../../actions/strainActions'

class MainPage extends Component {

    state = {
        dataSource: ['Hello', 'There']
    }

    componentDidMount(){
        const {onFetchStrains} = this.props 

        onFetchStrains()
    }
    render() {
        
        return (
            <div>
                {/* <SearchBar
                    dataSource={this.state.dataSource}
                    onChange={(value) => this.setState({ dataSource: [value, value + value, value + value + value] })}
                    onRequestSearch={() => console.log('onRequestSearch')}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                /> */}
                {this.props.strains && <StrainTable strains={this.props.strains}/> }
            I am a Main Page
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