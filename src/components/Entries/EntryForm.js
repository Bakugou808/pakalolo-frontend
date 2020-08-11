import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { setEntryDisplay, postEntry } from '../../actions/entriesActions'


export const EntryForm = (props) => {
    const {form, setForm} = props
    return (
        <div>
            <Modal
                size="lg"
                show={form}
                onHide={()=>setForm(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        New Entry
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>WILL ADD A FORM HERE...</Modal.Body>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    onPostEntry: (entryData) => postEntry(entryData, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
