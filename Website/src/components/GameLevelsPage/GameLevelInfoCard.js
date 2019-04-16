import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/index';
import CardContent from '@material-ui/core/CardContent/index';
import CardActions from '@material-ui/core/CardActions/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import StarIcon from '@material-ui/icons/Star';

function GameLevelInfoCard({ levelInfo, handleRedirection }) {
    const { levelId, level, isAvailable, playerStars } = levelInfo;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    Уровень {level}
                </Typography>
                <Typography>
                    <StarIcon fontSize="small" color={playerStars > 0 ? 'secondary' : 'disabled'} />
                    <StarIcon fontSize="small" color={playerStars > 1 ? 'secondary' : 'disabled'} />
                    <StarIcon fontSize="small" color={playerStars > 2 ? 'secondary' : 'disabled'} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    disabled={!isAvailable}
                    onClick={handleRedirection(levelId)}
                >
                    Выбрать
                </Button>
            </CardActions>
        </Card>
    );
}

GameLevelInfoCard.propTypes = {
    levelInfo: PropTypes.shape({
        levelId: PropTypes.number.isRequired,
        level: PropTypes.number.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        playerStars: PropTypes.number.isRequired,
    }).isRequired,
    handleRedirection: PropTypes.func.isRequired,
};

export default GameLevelInfoCard;
