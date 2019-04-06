import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function GameLevelInfoCard({ levelInfo, handleRedirection }) {
    const { levelId, level, isAvailable, playerStars } = levelInfo;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Уровень {level}
                </Typography>
                <Typography>
                    {Array(playerStars).fill().map((item, index) =>
                        <StarIcon key={index} />)}
                    {Array(3 - playerStars).fill().map((item, index) =>
                        <StarBorderIcon key={index} />)}
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
