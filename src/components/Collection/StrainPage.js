import React, {useState, useEffect} from 'react'
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
                    <Typography>{children}</Typography>
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
}));





function StrainPage(props) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [value, setValue] = React.useState(0);
    const [comments, setComments] = useState(false)
    const { collection, allComments, onPostLike, onDeleteLike } = props
    const [renderedComments, setRenderedComments] = useState([])
    const { strain } = collection
    const [liked, setLiked] = React.useState(false)
    const [totalLikes, setTotalLikes] = React.useState(0)


    useEffect(()=> {
        
        strain.likes.length > 0 ? strain.likes.forEach(like => (like.user_id == localStorage.userId) ? setLiked(true) : setLiked(false)) : setLiked(false)
        setTotalLikes(strain.likes.length)
    }, [strain])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLike = () => {
        console.log('liked strain')
        let data = {likeable_type: "Strain", likeable_id: strain.id, user_id: localStorage.userId}
        // !liked && (onPostLike(data) && setAddLike(true) && setLiked(true))
        
            onPostLike(data)
            setLiked(true)
            setTotalLikes((prev) => prev+1)
    }

    const handleUnlike = () => {
        let data = {likeable_type: "Strain", likeable_id: strain.id, user_id: localStorage.userId}
            
            onDeleteLike(data) 
            setLiked(false)
            setTotalLikes((prev) => prev-1)
        
    }
    
    


    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterBottom component="div">
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
                                    <Chip label={`${totalLikes} Likes`} clickable onClick={liked ? handleUnlike : handleLike}/>
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
                                <Paper className={classes2.paper2} onClick={()=>setComments(!comments)}>
                                    
                                    {comments ? 'Hide Comments' : "View Comments"}
                                
                                </Paper>
                                {comments && 
                                // <Paper className={classes2.paper}>
                                //     {renderComments()}
                                // </Paper>
                                <CommentComponent type='Strain' commentable_id={strain.id}/>
                                
                                }
                            </Grid>                           
                        </Grid>}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Entries collection={collection} />
            </TabPanel>
        </div>
    );
}


const mapStateToProps = (store) => ({
    collection: store.collection.selectedStrain
    
})

const mapDispatchToProps = (dispatch) => ({
    onPostLike: (data) => postLike(data, dispatch),
    onDeleteLike: (data) => deleteLike(data, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(StrainPage)