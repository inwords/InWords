import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GameInfoCardMenu from './GameInfoCardMenu';

const styles = {
    root: {
        paddingBottom: 0,
    },
};

function GameInfoCard({ gameInfo, handleRedirection, handleGamePackDeletion = null, classes }) {
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
                classes={{ root: classes.root }}
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameInfoCard);
