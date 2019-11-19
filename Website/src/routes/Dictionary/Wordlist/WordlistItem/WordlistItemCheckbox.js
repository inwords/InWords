import styled from '@emotion/styled';
import Checkbox from '@material-ui/core/Checkbox';

const WordlistItemCheckbox = styled(Checkbox)`
  ${props => props.theme.breakpoints.down('xs')} {
    margin-left: -12px;
  }
`;

export default WordlistItemCheckbox;
