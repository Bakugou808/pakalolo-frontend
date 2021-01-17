import React, { useState, useEffect } from "react";
import {
  postSmokeList,
  patchSmokeList,
  setEntriesForSmokeList,
  setSelectedSmokeList,
} from "../../Redux/actions/smokeListActions";
import { setSelectedStrainsEntries } from "../../Redux/actions/entriesActions";
import { connect } from "react-redux";

const ListForm = (props) => {
  const [state, setState] = useState({
    editList: false,
    error: false,
    newList: false,
    fields: {
      user_id: "",
      title: "",
      description: "",
    },
  });

  const {
    onPostSmokeList,
    onPatchSmokeList,
    smokeList,
    setForm,
    onSetEntriesForSmokeList,
    onSetSelectedStrainsEntries,
    onSetSelectedSmokeList,
  } = props;

  useEffect(() => {
    if (smokeList) {
      setState({
        edit: true,
        fields: {
          user_id: smokeList.user_id,
          title: smokeList.title,
          description: smokeList.description,
        },
      });
    }
    onSetEntriesForSmokeList([]);
    onSetSelectedStrainsEntries([]);
  }, []);

  const handleChange = (e) => {
    const newFields = { ...state.fields, [e.target.name]: e.target.value };
    setState((prev) => ({ ...prev, fields: newFields }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.edit) {
      onPatchSmokeList(state.fields, smokeList.id);
      // setSelected([])
    } else {
      const newFields = { ...state.fields, user_id: localStorage.userId };
      setState((prev) => ({ ...prev, fields: newFields }));

      onPostSmokeList(newFields);
    }
    onSetEntriesForSmokeList([]);
    onSetSelectedStrainsEntries([]);
    onSetSelectedSmokeList([]);
    setForm(false);
  };

  const { title, description } = state.fields;

  return (
    <div>
      {state.error ? <h1>Try again...</h1> : null}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={description}
            required
            onChange={handleChange}
          />
        </div>
      </form>

      <button className="btn btn-info" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  onPostSmokeList: (data) => postSmokeList(data, dispatch),
  onPatchSmokeList: (data, smokeListId) =>
    patchSmokeList(data, smokeListId, dispatch),
  onSetEntriesForSmokeList: (data) => dispatch(setEntriesForSmokeList(data)),
  onSetSelectedStrainsEntries: (data) =>
    dispatch(setSelectedStrainsEntries(data)),
  onSetSelectedSmokeList: (data) => dispatch(setSelectedSmokeList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
