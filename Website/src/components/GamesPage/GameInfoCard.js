import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/index';
import CardHeader from '@material-ui/core/CardHeader/index';
import CardContent from '@material-ui/core/CardContent/index';
import CardActions from '@material-ui/core/CardActions/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';

function GameInfoCard({ gameInfo, action = null }) {
    const { gameId, title, isAvailable, description } = gameInfo;

    return (
        <Card>
            <CardHeader
                action={action}
                title={title}
            />
            <CardContent>
                <Typography component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    disabled={!isAvailable}
                    href={`#/game/${gameId}`}
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
    action: PropTypes.node
};

export default GameInfoCard;
