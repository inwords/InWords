import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import Paper from 'src/components/Paper';
import useWordPairs from 'src/hooks/useWordPairs';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';

const DictionaryCard = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 24px;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  transition: ${props =>
    props.theme.transitions.create('box-shadow', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    box-shadow: ${props => props.theme.shadows[4]};
  }
`;

const DictionaryCardIconContainer = styled.div`
  color: ${props => props.theme.palette.primary.light};
  margin-right: 32px;
`;

const DictionaryCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DictionaryCardValue = styled.span`
  display: block;
  font-weight: 400;
`;

function getWordEnding(n) {
  const end = n % 10;

  if (end === 0 || n >= 5) {
    return '';
  }
  if (end !== 1) {
    return 'а';
  }

  return 'о';
}

function DictionaryMain() {
  const history = useHistory();

  const wordPairs = useWordPairs();
  const trainingWordPairs = useTrainingWordPairs();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <DictionaryCard
          onClick={() => {
            history.push('/dictionary/my');
          }}
          role="link"
        >
          <DictionaryCardIconContainer>
            <LibraryBooksIcon fontSize="large" />
          </DictionaryCardIconContainer>
          <DictionaryCardContent>
            <span>Всего</span>
            <DictionaryCardValue>
              {wordPairs.length} слов{getWordEnding(wordPairs.length)}
            </DictionaryCardValue>
          </DictionaryCardContent>
        </DictionaryCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DictionaryCard
          onClick={() => {
            history.push('/training/main');
          }}
          role="link"
        >
          <DictionaryCardIconContainer>
            <SchoolIcon fontSize="large" />
          </DictionaryCardIconContainer>
          <DictionaryCardContent>
            <span>На повторение</span>
            <DictionaryCardValue>
              {trainingWordPairs.length} слов
              {getWordEnding(trainingWordPairs.length)}
            </DictionaryCardValue>
          </DictionaryCardContent>
        </DictionaryCard>
      </Grid>
    </Grid>
  );
}

export default DictionaryMain;
