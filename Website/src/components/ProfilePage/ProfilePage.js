import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        maxWidth: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 2,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
});

function ProfilePage({ editingAvailable, userInfo, classes }) {
    const { avatarPath, nickName, experience } = userInfo;

    return (
        <Card className={classes.card}>
            {avatarPath && (
                <CardMedia
                    className={classes.media}
                    image={avatarPath}
                    title="Avatar"
                />)}
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {nickName}
                </Typography>
                <Typography>
                    {experience} опыта
                </Typography>
            </CardContent>
            <CardActions>
                {editingAvailable && (
                    <Button size="small" color="primary" href="#profile_settings">
                        Редактировать
                    </Button>)}
            </CardActions>
        </Card>
    );
}

ProfilePage.propTypes = {
    editingAvailable: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        userId: PropTypes.number,
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired,
        experience: PropTypes.number.isRequired
    }).isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
    React.memo(ProfilePage)
);
