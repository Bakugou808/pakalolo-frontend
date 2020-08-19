import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { setEntryDisplay, postEntry, patchEntry } from '../../actions/entriesActions'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VendorForm from '../Vendors/VendorForm'

import Autocomplete from '@material-ui/lab/Autocomplete';


export const EntryForm = (props) => {
    const {collection, setSelected, onPatchEntry, onPostEntry, closeForm, entry, vendors} = props

    const [state, setState] = React.useState({
        edit: false,
        error: false,
        newEntry: false,
        newVendor: false,
        fields: {
            vendor_id: '',
            collection_id: '',
            rating: '',
            review: '',
            smoke_list_id: null,
        }
    })


    useEffect(() => {
        if (entry) {
            const { entry } = props
            setState({
                edit: true, 
                fields: {
                    vendor_id: entry.vendor_id,
                    collection_id: entry.collection.id,
                    rating: entry.rating,
                    review: entry.review,
                    smoke_list_id: entry.smoke_list_id,
                }
            })
        }
    }, [])

    const defaultProps = {
        options: vendors,
        getOptionLabel: (option) => option.name,
        // setVendor: (option) => setState((prevState) => ({...prevState, fields: {...prevState.fields, vendor_id: option.id}})),

    };

    const flatProps = {
        options: vendors.map((option) => option.name),
    };

    // const [value, setValue] = React.useState(null);

    const handleChange = (e) => {
        const newFields = { ...state.fields, [e.target.name]: e.target.value };
        setState((prev) => ({...prev, fields: newFields }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (state.edit) {
            onPatchEntry(state.fields, entry.id)
            setSelected([])
        } else {
            onPostEntry(state.fields)
        }
        closeForm()
    };


    const handleNewVendor = () => {
        setState(prev => ({ ...prev, newVendor: !prev.newVendor }))

    }



    const { rating, review, vendor_id } = state.fields  


    const newVendorStyle = {
        'cursor': 'pointer'
    }


 

        return (
            <div>
                {state.error ? <h1>Try again...</h1> : null}
                <div className="form-group">
                    {/* <label>Search Vendors</label>
                    <label onClick={handleNewVendor} style={newVendorStyle}>/New Vendor</label>
                    {(!this.state.newVendor && !this.state.edit) && <Autocomplete suggestions={this.suggestions()} setVendor={this.setVendor} />}
                    {this.state.newVendor && <VendorForm handleClick={this.handleNewVendor} />}
                    {this.state.edit && <Autocomplete vendor={this.entry.vendor} suggestions={this.suggestions()} setVendor={this.setVendor} />} */}
                    {/* <Autocomplete
                        {...defaultProps}
                        id="auto-select"
                        autoSelect
                        onChange={(event, newValue) => {
                            setValue(newValue)
                            setState((prevState) => ({...prevState, fields: {...prevState.fields, collection_id: collection.id, vendor_id: newValue.id}}));
                          }}
                        renderInput={(params) => <TextField {...params} label="Select Vendor" margin="normal" required   />}
                    /> */}
                    <Button onClick={handleNewVendor} style={newVendorStyle}>New Vendor</Button>
                    {state.newVendor ? <VendorForm setState={setState} /> : <Autocomplete
                        {...defaultProps}
                        id="auto-select"
                        autoSelect
                        onChange={(event, newValue) => {
                            // setValue(newValue)
                            setState((prevState) => ({...prevState, fields: {...prevState.fields, collection_id: collection.id, vendor_id: newValue.id}}));
                          }}
                        renderInput={(params) => <TextField {...params} label={entry ? entry.vendor.name : "Select Vendor"} margin="normal" required   />}
                    />}
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Rating</label>
                        <input className="form-control" type="integer" name="rating" value={rating} required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Review</label>
                        <input className="form-control" type="name" name="review" value={review} required onChange={handleChange} />
                    </div>
                    
                </form>

                <button className="btn btn-info" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        )
    
}


const mapStateToProps = (store) => ({
    vendors: store.vendors.allVendors
})

const mapDispatchToProps = (dispatch) => ({
    onPostEntry: (entryData) => postEntry(entryData, dispatch),
    onPatchEntry: (entryData, entryId) => patchEntry(entryData, entryId, dispatch)


})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
