import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SchoolIcon from '@material-ui/icons/School';
import Paper from 'src/components/Paper';
import useWordPairs from 'src/hooks/useWordPairs';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';

const DictionaryMainRoot = styled.div`
  display: flex;
`;

const DictionaryCard = styled(Paper)`
  margin: 0 12px;
  display: flex;
  align-items: center;
  padding: 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: inherit;

  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    color: inherit;
    background-color: ${props => props.theme.palette.action.hover};
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
    <DictionaryMainRoot>
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
    </DictionaryMainRoot>
  );
}

export default DictionaryMain;
