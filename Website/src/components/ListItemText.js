import PropTypes from 'prop-types';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Typography from 'src/components/Typography';

const ListItemTextRoot = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  flex: 1 1 auto;
`;

function ListItemText({ primary, secondary, ...rest }) {
  return (
    <ListItemTextRoot {...rest}>
      <Typography>{primary}</Typography>
      {secondary && (
        <Typography
          color="textSecondary"
          css={css`
            display: block;
          `}
        >
          {secondary}
        </Typography>
      )}
    </ListItemTextRoot>
  );
}

ListItemText.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string
};

export default ListItemText;
