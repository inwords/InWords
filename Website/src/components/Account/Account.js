import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(300 + theme.spacing.unit * 3 * 2)]: {
            width: 240,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    card: {
        maxWidth: 240,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
});

function Account({ avatarPath = null, nickName, experience, classes }) {
    return (
        <main className={classes.main}>
            <Card className={classes.card}>
                <CardActionArea>
                    {avatarPath && (
                        <CardMedia
                            className={classes.media}
                            image={avatarPath}
                            title="Contemplative Reptile"
                        />)}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {nickName}
                        </Typography>
                        <Typography component="p">
                            {experience} опыта
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </main>
    );
}

Account.propTypes = {
    avatarPath: PropTypes.string,
    nickName: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
