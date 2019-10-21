import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from 'src/components/Icon';

import Button from 'src/components/Button';
import ButtonBase from 'src/components/ButtonBase';
import NavList from 'src/layout/NavList';
import NavListItem from 'src/layout/NavListItem';
import Drawer from 'src/layout/Drawer';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import './nav-bar.scss';

const styles = {
  root: css`
    display: flex;
    width: 100%;

    @media (max-width: 600px) {
      height: 48px;
    }
  `,
  block: css`
    display: flex;
  `,
  blockItem: css`
    display: flex;
  `,
  brandBlock: css`
    margin-right: 48px;
    color: var(--color-on-primary);
  `,
  brandLink: css`
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-on-primary);

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  `
};

const IconButton = React.forwardRef(function Icon(props, ref) {
  const { children, primary, className, ...rest } = props;

  return (
    <ButtonBase
      className={classNames('icon-button', {
        'icon-button--primary': primary,
        [className]: Boolean(className)
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

function NavBar({ handleToggle }) {
  return (
    <div css={styles.root}>
      <div className="nav-bar__block nav-bar__block-menu-icon">
        <div className="nav-bar__block--item nav-bar__block--icon">
          <IconButton onClick={handleToggle} primary>
            <Icon name="menu" />
          </IconButton>
        </div>
      </div>
      <div css={[styles.block, styles.brandBlock]}>
        <RouterLink to="/" css={styles.brandLink}>
          InWords
        </RouterLink>
      </div>
    </div>
  );
}

NavBar.propTypes = {};

export default NavBar;
