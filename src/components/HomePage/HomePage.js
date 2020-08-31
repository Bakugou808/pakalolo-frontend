import React from 'react'
import { connect } from 'react-redux';
import { AuthHOC } from '../HOCs/AuthHOC'



function HomePage(props) {
    return (
        <div>
            { props.user && `Welcome to Pakalolo ${props.user.username}!`}
            <br>
            </br>
            add top strains, click to see by tag. add recent smoke lists. add favorite vendors. add a suggestion. add articles. 
        </div>
    )
}


const mapStateToProps = (store) => {
    return {
      user: store.user.data,
      error: store.user.error
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    //   onFetchUser: (userSignInData, history)=> fetchUser(userSignInData, history, dispatch), 
      // the above is for api/async calls 
      // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
    }
  }
  
  
  export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(HomePage))