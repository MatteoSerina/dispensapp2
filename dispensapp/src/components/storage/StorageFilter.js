import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    categoryInput: {
        height: '4em',
    }
}));

const StorageFilter = (props) => {
    const classes = useStyles();

    function handleChange(e) {
        props.onFilter(e.target.value);
    }

    return (
        <form noValidate autoComplete="off">
            <Box display="flex" p={1}>
                <Box p={1} flexGrow={1}>
                    <TextField className={classes.categoryInput} name="category" label="Categoria" variant="outlined" fullWidth onChange={handleChange} value={props.category} />
                </Box>
            </Box>
        </form>
    );
}

export default StorageFilter;