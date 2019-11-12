import { withStyles } from '@material-ui/core/styles';
//import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';

// const LightTooltip = styled(Tooltip)`
//   & .MuiTooltip-tooltip {
//     background-color: ${props => props.theme.palette.common.white};
//     color: ${props => props.theme.palette.text.primary};
//     box-shadow: ${props => props.theme.shadows[1]};
//     font-size: 12px;
//   }
// `;

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12
  }
}))(Tooltip);

export default LightTooltip;
