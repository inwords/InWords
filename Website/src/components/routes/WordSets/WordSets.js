import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import WordSetPairsAddButton from './WordSetPairsAddButton';

function WordSets({ wordSets }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {wordSets.map(({ id, title, description }) => (
        <GridItem key={id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-course-${id}`}
                component={Link}
                to={`${match.url}/${id}`}
                variant="text"
                color="primary"
              >
                Пройти
              </LinkButton>
              <Space />
              <IconButton
                data-testid={`to-word-set-${id}`}
                component={Link}
                to={`${match.url}/${id}/word-pairs`}
              >
                <Icon>list</Icon>
              </IconButton>
              <WordSetPairsAddButton gameId={id} />
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

WordSets.propTypes = {
  wordSets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default WordSets;
