import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

function GameLevelInfoCard({ levelInfo }) {
    const { levelId, level, isAvailable, playerStars } = levelInfo;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    Уровень {level}
                </Typography>
                <div>
                    <StarIcon color={playerStars > 0 ? 'secondary' : 'disabled'} />
                    <StarIcon color={playerStars > 1 ? 'secondary' : 'disabled'} />
                    <StarIcon color={playerStars > 2 ? 'secondary' : 'disabled'} />
                </div>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    disabled={!isAvailable}
                    href={`#/game_level/${levelId}`}
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
    }).isRequired
};

export default GameLevelInfoCard;