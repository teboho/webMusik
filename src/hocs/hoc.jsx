import React, { useEffect } from 'react';

const withLogger = (WrappedComponent) => {
    /**
     * 
     * @param {*} props this nested component is the one that renders the wrapped component
     * @returns 
     */
    const WithLogger = (props) => {
        // log stuff 
        useEffect(() => {
            // log data on component mount
            console.log(`Component ${WrappedComponent.name} mounted.`);
            // cleanup
            return () => {
                console.log(`Component ${WrappedComponent.name} unmounted.`)
            }
        }, []);

    // log stuff with every new mount
        useEffect(() => {
            // Log data on component update
            console.log(`Component ${WrappedComponent.name} updated.`);
        });

        return <WrappedComponent {...props} />
    }

    WithLogger.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithLogger;
}

export default withLogger;