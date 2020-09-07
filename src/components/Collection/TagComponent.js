import React, { useState, useEffect } from 'react'
import {deleteTag} from '../../actions/tagActions'
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';import { connect } from 'react-redux'


const TagComponent = ({ tag, onDeleteTag, handleForm, setTags }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleTagOptions = () => {
        // setTagOptions(true)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleRemoveTag = () => {
        onDeleteTag(tag.id)
        handleClose()
        handleForm()
    
        setTags(prev => prev.filter(tag0 => tag0.title != tag.title))
    }
    
    return (
        <div>
            <Chip label={`${tag.title}`} clickable onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleRemoveTag}>Remove Tag</MenuItem>
                {/* <MenuItem onClick={handleUpVote}>UpVote This Comment</MenuItem> */}
            </Menu>

        </div>
    )
}



const mapStateToProps = (store) => ({

})

const mapDispatchToProps = (dispatch) => ({
    onDeleteTag: (data) => deleteTag(data, dispatch),
   
})
export default connect(mapStateToProps, mapDispatchToProps)(TagComponent)