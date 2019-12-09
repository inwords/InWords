import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useForm from 'src/hooks/useForm';
import { saveValue } from 'src/localStorage';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';

const trainingTypesInfo = [
  {
    typeId: 0,
    title: 'Карточки',
    description: 'Необходимо открыть правильную пару "Слово-Перевод"'
  }
];

const TypesSettings = styled.div`
  margin-bottom: 8px;
`;

function TrainingTypes({ localData, endpoint = '' }) {
  const match = useRouteMatch();

  const { inputs, handleChange } = useForm({
    quantity: localData['training-words-quantity'] || 2
  });

  React.useEffect(() => {
    saveValue('training-words-quantity', inputs.quantity);
  }, [inputs.quantity]);

  return (
    <>
      <TypesSettings>
        <label htmlFor="quantity">Слов в тренировке</label>
        <div>
          <input
            id="quantity"
            name="quantity"
            type="range"
            min="2"
            max="8"
            value={inputs.quantity}
            onChange={handleChange}
          />
        </div>
        <span>{inputs.quantity}</span>
      </TypesSettings>
      <Grid container spacing={3}>
        {trainingTypesInfo.map(({ typeId, title, description }) => {
          return (
            <Grid key={typeId} item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader title={title} />
                <CardContent>
                  <Typography variant="body2">{description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`${match.url}/${typeId}${endpoint}`}
                    size="small"
                    color="primary"
                  >
                    Выбрать
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

TrainingTypes.propTypes = {
  localData: PropTypes.shape({
    'training-words-quantity': PropTypes.string
  }),
  endpoint: PropTypes.string
};

export default withLocalStorageData(TrainingTypes, ['training-words-quantity']);
