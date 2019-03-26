import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 4,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
});

function Profile({ avatarPath = null, nickName, experience, classes }) {
    return (
        <Card className={classes.card}>
            <CardActionArea>
                {avatarPath && (
                    <CardMedia
                        className={classes.media}
                        image={avatarPath}
                        title="Avatar"
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
    );
}

Profile.propTypes = {
    avatarPath: PropTypes.string,
    nickName: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
