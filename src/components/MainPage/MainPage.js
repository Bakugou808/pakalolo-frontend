import { connect } from "react-redux";
import { fetchCurrentUser } from "../../Redux/actions/authActions";

import React, { Component } from "react";
import StrainTable from "./StrainTable";
import { fetchStrains } from "../../Redux/actions/strainActions";
import LinearProgressBar from "./LinearProgressBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class MainPage extends Component {
  state = {
    showTable: false,
  };

  componentDidMount() {
    const { onFetchStrains, onFetchCurrentUser } = this.props;
    onFetchCurrentUser();
    onFetchStrains();
  }

  handleRedirect = (path) => {
    this.props.history.push(path);
  };

  goToSignUp = () => {
    this.props.history.push("signup");
  };
  goToLogIn = () => {
    this.props.history.push("signin");
  };

  showSearchPage = () => {
    this.setState({ showTable: true });
  };

  render() {
    return (
      <div className="mainPageContainer">
        {this.props.fetching ? (
          <LinearProgressBar />
        ) : (
          <div className="mainPageStrainTableCont">
            {this.props.auth ? (
              this.props.strains && <StrainTable strains={this.props.strains} />
            ) : this.state.showTable ? (
              this.props.strains && <StrainTable strains={this.props.strains} />
            ) : (
              <div className="welcomeContainer">
                <div className="welcomeText">
                  <div className="loginSignupCont">
                    <div
                      className="loginLink"
                      onClick={() => this.handleRedirect("signup")}
                    >
                      Sign Up
                    </div>
                    <div
                      className="loginLink"
                      onClick={() => this.handleRedirect("signin")}
                    >
                      Login
                    </div>
                  </div>
                  <h3>Welcome to Paka-lolo! </h3>
                  <p>
                    We're here to let you learn and track your favorite strains.
                    Many cannabis users are either uneducated about their
                    cannabis options, or are inundated with all the options that
                    its hard to keep track of what works and what falls flat.
                    Paka-lolo is here to help fix that.
                  </p>
                  <p>
                    With Paka-lolo you can search for stains, read about its
                    effects, flavors, medicinal benefits as well as their
                    chemical profiles. If you make an account you can add them
                    to your Collection, and with each strain that you save, you
                    can write an Entry.
                  </p>
                  <p>An "Entry" includes:</p>
                  <div className="entryListCont">
                    <ul className="entryList">
                      <li>A description of your experience</li>
                      <li>A rating of the strain</li>
                      <li>A rating of the Vendor you bought it from</li>
                    </ul>
                  </div>
                  <p>
                    The goal is to help you keep track of what actually works
                    for your unique biochemistry and improve your ability to
                    self-medicate with one of nature's most magical plants.
                  </p>
                  <br />
                  <p>
                    If you'd rather just learn about the strains, you can still
                    access the database to browse. This site is here to educate!
                  </p>
                  <div>
                    <h4 className="welcomePrompt">
                      Would you like to make an account?
                    </h4>
                    <div className="welcomeBtns">
                      <button onClick={this.goToSignUp}>Yes!</button>
                      <button onClick={this.goToLogIn}>
                        I have an account. Take me to login!
                      </button>
                      <button onClick={this.showSearchPage}>
                        No thanks, take me to the search page!
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <h4>Would you like to make an account?</h4>
                  <div>
                    <button onClick={this.goToSignUp}>Yes!</button>
                    <button onClick={this.goToLogIn}>
                      I have an account. Take me to login!
                    </button>
                    <button onClick={this.showSearchPage}>
                      No thanks, take me to the search page!
                    </button>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    strains: store.strains.allStrains,
    fetching: store.strains.fetching,
    auth: store.authorized.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchStrains: () => {
      fetchStrains(dispatch);
    },
    onFetchCurrentUser: () => fetchCurrentUser(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
