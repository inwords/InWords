import React from 'react';
import PropTypes from 'prop-types';

const PageTitleContext = React.createContext();

function PageTitleContextProvider({ children }) {
    const [pageTitle, setPageTitle] = React.useState('');

    const changePageTitle = pageTitle => {
        setPageTitle(pageTitle);
    };

    return (
        <PageTitleContext.Provider
            value={{
                pageTitle,
                changePageTitle
            }}
        >
            {children}
        </PageTitleContext.Provider>
    );
}

PageTitleContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PageTitleContext, PageTitleContextProvider };
