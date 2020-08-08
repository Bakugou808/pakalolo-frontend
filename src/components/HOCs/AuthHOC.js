import React, { Fragment } from "react";
import { api } from "../../services/api";
import { fetchCurrentUser, fetchCurrentUserSuccess } from '../../actions/authActions'
import { fetchStrains } from '../../actions/strainActions'
import { fetchCollection } from '../../actions/collectionActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


 export const AuthHOC = WrappedComponent => {
    console.log(WrappedComponent)
    class AuthHOC extends React.Component {

      state = {
        authorized: false,
        pending: true, 
      }

      renderAuth = () => {
        if (this.state.pending){
          return null
        } else if (this.state.authorized){
          return <WrappedComponent {...this.props} />
        } else {
          // return <Redirect to='/'/>
          this.props.history.push('/signin')
        }
      }

      componentDidMount() {
          this.checkLogin() 
          this.props.onFetchStrains()
          
      }
  
      checkLogin = () => {
        if (!localStorage.getItem("token")) {
          this.setState({pending: false, authorized: false})
        } else {
          api.auth.getCurrentUser().then(resp => {
            if(resp.error){
              this.setState({pending: false, authorized: false})
            } else {
              this.setState({authorized: true, pending: false}, ()=> this.props.onFetchCurrentUserSuccess(resp))
              this.props.onFetchCollection(localStorage.userId)
            }
          })
        }
      };

      render() {
        return (
          <div>
            {this.renderAuth()}
          </div>
        );
      }
  //   };
  // };
};
  const mapStateToProps = (store) => {
    return {
      user: store.user.data,
      authorized: store.authorized
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchCurrentUser: ()=> fetchCurrentUser(dispatch), 
      onFetchCurrentUserSuccess: (user)=> dispatch(fetchCurrentUserSuccess(user)),
      onFetchStrains: () => fetchStrains(dispatch),
      onFetchCollection: (userId) => fetchCollection(userId, dispatch)
    }
  }



  return connect(mapStateToProps, mapDispatchToProps)(AuthHOC)


};