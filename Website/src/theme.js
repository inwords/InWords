import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: amber,
    },
    typography: {
        useNextVariants: true,
    },
});

export default theme;
