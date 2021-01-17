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

  render() {
    return (
      <div className="mainPageContainer">
        {this.props.fetching ? (
          <LinearProgressBar />
        ) : (
          <div>
            {this.props.strains && <StrainTable strains={this.props.strains} />}
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
