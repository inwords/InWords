import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import useDialog from 'src/hooks/useDialog';
import withReceivedUserInfo from 'src/HOCs/withReceivedUserInfo';
import EmailEditDialog from './EmailEditDialog';

const AccountPaper = styled(Paper)`
  margin-top: 16px;
  padding: 16px 24px 24px;
`;

const AccountList = styled(List)`
  margin-top: 8px;
`;

function Account({ account: { email } }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Container component="div" maxWidth="sm">
      <AccountPaper>
        <Typography component="h1" variant="h5">
          Аккаунт
        </Typography>
        <AccountList>
          <ListItem button onClick={handleOpen}>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <EmailEditDialog open={open} handleClose={handleClose} />
          <Divider component="li" variant="middle" />
        </AccountList>
      </AccountPaper>
    </Container>
  );
}

Account.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
};

export default withReceivedUserInfo(Account);
