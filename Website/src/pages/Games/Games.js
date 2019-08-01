import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Games({ gamesInfo }) {
    return (
        <Container component="div" maxWidth="lg">
            <Grid container spacing={3}>
                {gamesInfo.map(gameInfo => (
                    <Grid
                        key={gameInfo.gameId}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card>
                            <CardHeader title={gameInfo.title} />
                            <CardContent>
                                <Typography variant="body2">
                                    {gameInfo.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    component={Link}
                                    to={`/game/${gameInfo.gameId}`}
                                    size="small"
                                    color="primary"
                                    disabled={!gameInfo.isAvailable}
                                >
                                    Выбрать
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

Games.propTypes = {
    gamesInfo: PropTypes.arrayOf(
        PropTypes.shape({
            gameId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            isAvailable: PropTypes.bool.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default Games;
