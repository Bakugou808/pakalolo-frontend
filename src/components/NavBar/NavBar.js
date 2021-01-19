import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { connect } from "react-redux";
import { signOutUser } from "../../Redux/actions/userActions";
import {
  setEntriesForSmokeList,
  setSelectedSmokeList,
} from "../../Redux/actions/smokeListActions";
import { setSelectedStrainsEntries } from "../../Redux/actions/entriesActions";

import clsx from "clsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: "0px",
  },
  title: {
    flexGrow: 1,
  },
  // login: {
  //   "& > * + *": {
  //     marginLeft: theme.spacing(2),
  //   },
  // },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  link: {
    cursor: "pointer",
  },
  nav: {
    height: "50px",
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const {
    onSetEntriesForSmokeList,
    onSetSelectedStrainsEntries,
    onSetSelectedSmokeList,
  } = props;
  const onLogout = () => {
    const { onSignOutUser, user } = props;
    onSignOutUser(user.id);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    props.history.push("/");
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const redirect = (path) => {
    console.log(path);
    const clearStates = () => {
      onSetEntriesForSmokeList([]);
      onSetSelectedStrainsEntries([]);
      onSetSelectedSmokeList(null);
    };
    // path === "collection" && clearStates()
    clearStates();
    props.history.push(`/${path}`);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          ["Search", <SearchIcon />, ""],
          ["Home", <HomeIcon />, "home"],
          ["Collection", <CollectionsBookmarkIcon />, "collection"],
          ["Strain Lists", <FormatListBulletedIcon />, "lists"],
          ["Entries", <BorderColorIcon />, "entries"],
          ["Vendors", <AssessmentIcon />, "vendors"],
        ].map((arr, index) => (
          <ListItem button key={index} onClick={() => redirect(arr[2])}>
            <ListItemIcon>{arr[1]}</ListItemIcon>
            <ListItemText primary={arr[0]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.nav} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            {props.auth && <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit">
              Pakalolo
            </Link>
          </Typography>
          {
            props.auth && (
              <Typography variant="subtitle1" className={classes.login}>
                <Link
                  className={classes.link}
                  onClick={onLogout}
                  color="inherit"
                >
                  <ExitToAppIcon />
                </Link>
              </Typography>
            )
            // : (
            //   <Typography variant="subtitle1" className={classes.login}>
            //     <Link href="/signin" color="inherit">
            //       Sign In
            //     </Link>
            //   </Typography>
            // )}
          }
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
    auth: store.authorized.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOutUser: (userId) => dispatch(signOutUser(userId)),
    onSetEntriesForSmokeList: (data) => dispatch(setEntriesForSmokeList(data)),
    onSetSelectedStrainsEntries: (data) =>
      dispatch(setSelectedStrainsEntries(data)),
    onSetSelectedSmokeList: (data) => dispatch(setSelectedSmokeList(data)),
  };
};

// export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NavBar))
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
