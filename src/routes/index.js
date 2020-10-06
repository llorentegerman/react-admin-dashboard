import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';

function Routes() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const isUserLoggedIn = true;
    return isUserLoggedIn ? <PrivateSection /> : <PublicRoutes />;
}

export default Routes;
