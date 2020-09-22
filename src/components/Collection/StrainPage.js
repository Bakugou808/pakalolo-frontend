import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ChemChart from '../ChemChart'
import Entries from '../Entries/Entries'
import CommentComponent from '../Comments/CommentComponent'
import { postLike, deleteLike } from '../../actions/likeActions'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-bootstrap/Modal';
import { postTag, fetchAllTags } from '../../actions/tagActions'
import TagComponent from './TagComponent'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%'
    },
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer'
    },
    modal: {
        overflow: 'auto'
    }
}));





function StrainPage(props) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [value, setValue] = React.useState(0);
    const [comments, setComments] = useState(false)
    const { collection, allComments, onPostLike, onDeleteLike, onPostTag, page, allTags, onFetchAllTags } = props
    const [renderedComments, setRenderedComments] = useState([])
    const { strain } = collection
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [liked, setLiked] = React.useState(false)
    const [totalLikes, setTotalLikes] = React.useState(0)
    const [title, setTitle] = React.useState('')
    const [newTag, setNewTag] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [tags, setTags] = React.useState([])
    const [createTag, setCreateTag] = React.useState(false)

    useEffect(() => {
        strain.likes.length > 0 ? strain.likes.forEach(like => (like.user_id == localStorage.userId) ? setLiked(true) : setLiked(false)) : setLiked(false)
        setTotalLikes(strain.likes.length)
        collection.tags.length > 0 && setTags(collection.tags)

    }, [strain, collection])

    const defaultProps = {
        options: allTags,
        getOptionLabel: (option) => option,
        // setVendor: (option) => setState((prevState) => ({...prevState, fields: {...prevState.fields, vendor_id: option.id}})),

    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setTitle('')
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTitle = (event) => {
        event.preventDefault()
        setTitle(event.target.value)
    }


    const handleLike = () => {
        console.log('liked strain')
        let data = { likeable_type: "Strain", likeable_id: strain.id, user_id: localStorage.userId }
        // !liked && (onPostLike(data) && setAddLike(true) && setLiked(true))

        onPostLike(data)
        setLiked(true)
        setTotalLikes((prev) => prev + 1)
    }

    const handleUnlike = () => {
        let data = { likeable_type: "Strain", likeable_id: strain.id, user_id: localStorage.userId }

        onDeleteLike(data)
        setLiked(false)
        setTotalLikes((prev) => prev - 1)

    }

    const handleForm = () => {
        handleClose()
        // fetch gtags
        onFetchAllTags(localStorage.userId)
        setNewTag(true)
        handleScroll()
    }

    const renderTags = () => {

        return tags.map((tag, index) => {
            return <TagComponent key={index} tag={tag} handleForm={handleClose} setTags={setTags} />
        })
    }

    const handleTag = () => {
        let data = { collection_id: collection.id, title: title }
        onPostTag(data)
        setNewTag(false)
        handleScroll()
        setTags(prev => [...prev, data])
    }

    const handleScroll = () => {

        document.querySelector('body').style = ''
        document.querySelector('body').classList.remove('modal-open')
    }



    const newTagStyle = {
        'cursor': 'pointer'
    }

    return (
        <div className={classes.root}>

            <Typography variant="h3" gutterBottom component="span">
                <Paper className={classes2.root}>
                    {`${strain.name}: Strain Details`}
                </Paper>

            </Typography>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Entries" {...a11yProps(1)} />
                    {/* <Tab label="Terpene Profile" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
            {/* Tab 1: Strain Description*/}
            <TabPanel value={value} index={0}>
                <div className={classes2.root}>
                    {strain &&
                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <Paper className={classes2.root}>
                                    {`${strain.name}: Strain Details`}
                                    <Chip label={`${totalLikes} Likes`} clickable onClick={liked ? handleUnlike : handleLike} />
                                    <Tooltip title="Menu" aria-label="Menu" interactive >
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                                            <MoreVertIcon style={{ display: 'align-right' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleForm} >Add Tag</MenuItem>
                                        {/* <MenuItem onClick={handleUpVote}>UpVote This Comment</MenuItem> */}
                                    </Menu>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    <ChemChart data={strain.cannabinoidList} cannabinoids={true} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    <ChemChart data={strain.terpeneList} cannabinoids={false} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes2.paper}>
                                    {strain.description}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    Flavors: {strain.flavorList}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    Positive: {strain.effects.positive.join(', ')}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    Negative: {strain.effects.negative.join(', ')}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes2.paper}>
                                    Medical/Treats: {strain.effects.medical.join(', ')}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <Paper className={classes2.paper}>
                                    Tags: {collection.tags ? renderTags() : 'No Tags'}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <Paper className={classes2.paper2} onClick={() => setComments(!comments)}>

                                    {comments ? 'Hide Comments' : "View Comments"}

                                </Paper>
                                {comments &&

                                    <CommentComponent type='Strain' commentable_id={strain.id} />

                                }
                            </Grid>
                        </Grid>}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Entries collection={collection} pageEndPoint={page} />
            </TabPanel>
            {newTag &&
                <Modal
                    size="lg"
                    show={newTag}
                    onHide={() => setNewTag(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    onFocus={handleScroll}
                >
                    {newTag &&
                        (edit ?
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Edit Tag
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <form className="" onSubmit={handleTag}>

                                        <div className="form-group">
                                            <label>Title</label>
                                            <input className="form-control" type="name" name="title" value={title} required onChange={handleTitle} />
                                        </div>
                                    </form>

                                    <button className="btn btn-info" type="submit" onClick={handleTag}>Submit</button>
                                </Modal.Body>
                            </>
                            :
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Add Tag To Strain
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >

                                    <div className="form-group">
                                        <Button onClick={() => setCreateTag(prev => (!prev))} style={newTagStyle}>{createTag ? "Cancel" : "New Tag"}</Button>
                                        {createTag ?

                                            <form className="" onSubmit={handleTag}>
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input className="form-control" type="name" name="title" value={title} required onChange={handleTitle} />
                                                </div>
                                            </form>

                                            : <Autocomplete
                                                {...defaultProps}
                                                id="auto-select"
                                                autoSelect
                                                onChange={(event, newValue) => {
                                                    newValue != null && setTitle(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label={title ? title : "Select from Tags"} margin="normal" required />}
                                            />}
                                    </div>


                                    <button className="btn btn-info" type="submit" onClick={handleTag}>Submit</button>
                                </Modal.Body>
                            </>)
                    }
                </Modal>
            }
        </div>
    );
}


const mapStateToProps = (store) => ({
    collection: store.collection.selectedStrain,
    allTags: store.tags.allTags,

})

const mapDispatchToProps = (dispatch) => ({
    onPostLike: (data) => postLike(data, dispatch),
    onDeleteLike: (data) => deleteLike(data, dispatch),
    onPostTag: (data) => postTag(data, dispatch),
    onFetchAllTags: (userId) => fetchAllTags(userId, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(StrainPage)