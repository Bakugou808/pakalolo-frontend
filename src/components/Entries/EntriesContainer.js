import React from 'react'
import Entries from './Entries'
import { lighten, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({

    container: {
        margin: '200 px',
        padding: 60

    }
}));

const EntriesContainer = (props) => {
    const classes = useStyles()

    
    return (
        <Container  className={classes.container}>
            <Entries {...props} entriesPage={true} />
        </Container>
    )
}

export default EntriesContainer
