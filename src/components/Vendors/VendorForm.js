import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postVendor } from '../../actions/vendorActions'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline',
        // flexWrap: 'wrap',
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: theme.spacing(10),
        //     height: theme.spacing(10),
        // },
    },
    root2: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: theme.spacing(50),
        margin: theme.spacing(1)
    },
}));


const VendorForm = (props) => {
    const { onPostVendor, setState } = props
    const [vendor, setVendor] = React.useState('')
    const classes = useStyles()


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
            <form className={classes.root} onSubmit={handleSubmit}>

                <div >
                    <label>Vendor Name</label>
                    <input className="form-control" type="integer" name="vendor" value={vendor} required onChange={handleChange} />
                    <Tooltip title="Add New Vendor" aria-label="Add New Vendor" interactive >
                    <IconButton onClick={handleSubmit} >
                        <AddCircleOutlineIcon style={{ display: 'align-right' }} />
                    </IconButton>
                    </Tooltip>
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
