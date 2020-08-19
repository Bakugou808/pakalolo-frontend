import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postVendor } from '../../actions/vendorActions'

const VendorForm = (props) => {
    const { onPostVendor, setState } = props
    const [vendor, setVendor] = React.useState('')



    const handleSubmit = () => {
        let data = { name: vendor, user_id: localStorage.userId }
        onPostVendor(data)
        setState(prev => ({ ...prev, newVendor: !prev.newVendor }))
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            handleSubmit()
        } else {
            setVendor(e.target.value)
        }
    }

    const handleKeyDown = (event) => {
        event.preventDefault()
        if (event.key === 'Enter') {
            handleSubmit()
        } else {
            handleChange(event)
        }
    }

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Vendor Name</label>
                    <input className="form-control" type="integer" name="vendor" value={vendor} required onChange={handleChange}  />
                </div>

            </form>
        </>
    )
}

const mapStateToProps = (store) => ({

})

const mapDispatchToProps = (dispatch) => ({
    onPostVendor: (vendorData) => postVendor(vendorData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorForm)
