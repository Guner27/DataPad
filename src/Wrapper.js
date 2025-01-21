import React from 'react';
import Router from './Router';
import AProvider from './context/AProvider/AProvider';

export default () => {
    return (
        <AProvider>
            <Router/>
        </AProvider>
    );
};
