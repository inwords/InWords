import styled from '@emotion/styled';

const WordlistItemButton = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding-top: 9px;
  padding-right: 48px;
  padding-bottom: 8px;
  padding-left: 16px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }

  ${props => props.theme.breakpoints.down('xs')} {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export default WordlistItemButton;
