import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 240,
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
}));

function Profile({ userInfo, editingAvailable }) {
    const classes = useStyles();

    const { avatarPath, nickName, experience } = userInfo;

    return (
        <Card className={classes.card}>
            {avatarPath && (
                <CardMedia
                    image={avatarPath}
                    title="Avatar"
                    className={classes.media}
                />)
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {nickName}
                </Typography>
                <Typography variant="body2" component="p">
                    {experience} опыта
                </Typography>
            </CardContent>
            <CardActions>
                {editingAvailable && (
                    <Button
                        component={Link}
                        to="/profileSettings"
                        size="small"
                        color="primary"
                    >
                        Редактировать
                    </Button>)
                }
            </CardActions>
        </Card>
    );
}

Profile.propTypes = {
    userInfo: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired,
        experience: PropTypes.number.isRequired
    }).isRequired,
    editingAvailable: PropTypes.bool.isRequired
};

export default Profile;
