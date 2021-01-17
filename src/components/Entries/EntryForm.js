import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  setEntryDisplay,
  postEntry,
  patchEntry,
} from "../../Redux/actions/entriesActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VendorForm from "../Vendors/VendorForm";

import Autocomplete from "@material-ui/lab/Autocomplete";

export const EntryForm = (props) => {
  const {
    collection,
    setSelected,
    onPatchEntry,
    onPostEntry,
    closeForm,
    entry,
    vendors,
    smokeListPage,
    subEntryTable,
    setEdit,
  } = props;

  const [state, setState] = React.useState({
    edit: false,
    error: false,
    newEntry: false,
    newVendor: false,
    fields: {
      vendor_id: "",
      collection_id: "",
      rating: "",
      review: "",
      smoke_list_id: null,
    },
  });

  useEffect(() => {
    if (entry) {
      const { entry } = props;
      setState({
        edit: true,
        fields: {
          vendor_id: entry.vendor_id,
          collection_id: entry.collection.id,
          rating: entry.rating,
          review: entry.review,
          smoke_list_id: entry.smoke_list_id,
        },
      });
    }
  }, []);

  const defaultProps = {
    options: vendors,
    getOptionLabel: (option) => option.name,
    // setVendor: (option) => setState((prevState) => ({...prevState, fields: {...prevState.fields, vendor_id: option.id}})),
  };

  const flatProps = {
    options: vendors.map((option) => option.name),
  };

  const handleChange = (e) => {
    const newFields = { ...state.fields, [e.target.name]: e.target.value };
    setState((prev) => ({ ...prev, fields: newFields }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.edit) {
      let type = "";
      if (smokeListPage) {
        type = "smokeList";
      } else if (subEntryTable) {
        type = "subEntryTable";
      }
      onPatchEntry(state.fields, entry.id, type);
      setSelected([]);
      setEdit(false);
    } else {
      const newFields = { ...state.fields, collection_id: collection.id };
      setState((prev) => ({ ...prev, fields: newFields }));

      // onPostEntry(state.fields) this isn't updating for somereason?
      onPostEntry(newFields);
      // setSelected([])
    }
    closeForm();
  };

  const handleNewVendor = () => {
    setState((prev) => ({ ...prev, newVendor: !prev.newVendor }));
  };

  const { rating, review, vendor_id } = state.fields;

  const newVendorStyle = {
    cursor: "pointer",
  };

  return (
    <div>
      {state.error ? <h1>Try again...</h1> : null}
      <div className="form-group">
        <Button onClick={handleNewVendor} style={newVendorStyle}>
          {state.newVendor ? "Cancel" : "New Vendor"}
        </Button>
        {state.newVendor ? (
          <VendorForm setState={setState} />
        ) : (
          <Autocomplete
            {...defaultProps}
            id="auto-select"
            autoSelect
            onChange={(event, newValue) => {
              newValue != null &&
                setState((prevState) => ({
                  ...prevState,
                  fields: { ...prevState.fields, vendor_id: newValue.id },
                }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={entry ? entry.vendor.name : "Select Vendor"}
                margin="normal"
                required
              />
            )}
          />
        )}
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating</label>
          <input
            className="form-control"
            type="integer"
            name="rating"
            value={rating}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Review</label>
          <input
            className="form-control"
            type="name"
            name="review"
            value={review}
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

const mapStateToProps = (store) => ({
  vendors: store.vendors.allVendors,
});

const mapDispatchToProps = (dispatch) => ({
  onPostEntry: (entryData) => postEntry(entryData, dispatch),
  onPatchEntry: (entryData, entryId, type) =>
    patchEntry(entryData, entryId, dispatch, type),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
