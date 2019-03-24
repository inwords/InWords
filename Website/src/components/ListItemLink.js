import React from 'react';
import ListItem from '@material-ui/core/ListItem';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default ListItemLink;
