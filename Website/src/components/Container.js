import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${props => props.theme.breakpoints.up(props.maxWidth || 'md')} {
    max-width: ${props =>
      props.maxWidth === 'xs'
        ? 444
        : props.theme.breakpoints.values[props.maxWidth || 'md']}px;
  }
`;

export default Container;
