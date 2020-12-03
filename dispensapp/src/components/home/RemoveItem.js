import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    box:{
        height: "30vh",
    },
    card: {
        backgroundColor: '#f44336',
        textAlign: "center",
    },
    cardContent: {
        alignItems: "center",
    },
    icon:{
        color: "white",
        fontSize: "20vmax",
        textAlign: "center"
    }
  });


function RemoveItem() {
    const classes = useStyles();
    return (
        <Card onClick={() => { alert("Remove item") }} className={classes.card}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={1}
                m={1}
                className={classes.box}>
                <CardContent className={classes.cardContent}>
                    <RemoveIcon className={classes.icon} />
                </CardContent>
            </Box>
        </Card>
    );
}

export default RemoveItem;