import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function GameInfoCard({ gameInfo, handleRedirection }) {
    const { gameId, title, isAvailable, description } = gameInfo;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom={Boolean(description)} variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    disabled={!isAvailable}
                    onClick={handleRedirection(gameId)}
                >
                    Выбрать
                </Button>
            </CardActions>
        </Card>
    );
}

GameInfoCard.propTypes = {
    gameInfo: PropTypes.shape({
        gameId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    handleRedirection: PropTypes.func.isRequired,
};

export default GameInfoCard;
