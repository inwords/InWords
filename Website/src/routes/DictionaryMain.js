import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import Card from 'src/components/Card';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import CardTitle from 'src/components/CardTitle';
import CardAction from 'src/components/CardAction';
import Typoghraphy from 'src/components/Typography';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';

const TrainingCardSection = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const TrainingSchoolIcon = styled(SchoolIcon)`
  color: ${props => props.theme.palette.primary.light};
  margin-right: 8px;
  font-weight: 500;
`;

function getWordEnding(n) {
  const end = n % 10;

  if (end === 0 || end >= 5) {
    return '';
  }
  if (end !== 1) {
    return 'а';
  }

  return 'о';
}

function DictionaryMain() {
  const trainingWordPairs = useTrainingWordPairs();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <CardTitle as="h2">Закрытые карточки</CardTitle>
            <Typoghraphy as="p">
              Необходимо правильно открыть пару карточек «Слово-Перевод»
            </Typoghraphy>
            <TrainingCardSection>
              <TrainingSchoolIcon />
              <span>
                На повторение: {trainingWordPairs.length} слов
                {getWordEnding(trainingWordPairs.length)}
              </span>
            </TrainingCardSection>
          </CardContent>
          <CardActions>
            <CardAction as={RouterLink} to="/training/main">
              Поплыли
            </CardAction>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DictionaryMain;
