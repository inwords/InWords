import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import usePrevious from '../../../hooks/usePrevious';
import { AppBarContext } from '../../../contexts/AppBarContext';
import WordPairsUncheckButton from '../WordPairsUncheckButton';
import WordPairsDeletionButton from '../WordPairsDeleteButton';
import WordPairEditingButton from '../WordPairEditButton';
import WordPairAdditionButton from '../WordPairAddButton';
import LargePageContentContainer from '../../PageContentContainers/LargePageContentContainer';

const styles = theme => ({
    list: {
        width: '100%',
        marginTop: theme.spacing.unit,
        backgroundColor: theme.palette.background.paper,
    },
});

function WordlistPage({ wordPairs, checked, handleToggle, handleReset, classes }) {
    const { customizeAppBar, resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({ title: 'Словарь' });
    }, []);

    const prevChecked = usePrevious(checked);

    React.useEffect(() => {
        if (checked.length) {
            if (!prevChecked.length && checked.length === 1) {
                resetAppBar({
                    title: `Выбрано: ${checked.length}`,
                    color: 'secondary',
                    leftElements: <WordPairsUncheckButton handleReset={handleReset} />,
                    rightElements: <WordPairsDeletionButton checked={checked} />,
                });
            } else {
                customizeAppBar({ title: `Выбрано: ${checked.length}` })
            }
        } else {
            resetAppBar({ title: 'Словарь' })
        }
    }, [checked]);

    return (
        <LargePageContentContainer>
            <List className={classes.list}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <WordPairEditingButton wordPair={wordPair} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <WordPairAdditionButton />
        </LargePageContentContainer>
    );
}

WordlistPage.propTypes = {
    wordPairs: PropTypes.arrayOf(
        PropTypes.shape({
            serverId: PropTypes.number.isRequired,
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WordlistPage);
