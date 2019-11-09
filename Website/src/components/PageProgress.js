import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const PageProgress = withStyles(theme => ({
  progress: {
    display: 'block',
    marginTop: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))(CircularProgress);

export default PageProgress;
