import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/index';
import CardHeader from '@material-ui/core/CardHeader/index';
import CardContent from '@material-ui/core/CardContent/index';
import CardActions from '@material-ui/core/CardActions/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import GameInfoCardMenu from './GameInfoCardMenu';

function GameInfoCard({ gameInfo, handleRedirection, handleGamePackDeletion = null }) {
    const { gameId, title, isAvailable, description } = gameInfo;

    return (
        <Card>
            <CardHeader
                action={
                    handleGamePackDeletion && (
                        <GameInfoCardMenu
                            gameId={gameId}
                            handleGamePackDeletion={handleGamePackDeletion}
                        />)
                }
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
    handleGamePackDeletion: PropTypes.func,
};

export default GameInfoCard;
