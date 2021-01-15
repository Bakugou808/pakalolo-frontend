import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions/authActions";

import React, { Component } from "react";
import StrainTable from "./StrainTable";
import { fetchStrains } from "../../actions/strainActions";
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
        <CssBaseline />
        <div>
          {this.props.strains && <StrainTable strains={this.props.strains} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    strains: store.strains.allStrains,
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
