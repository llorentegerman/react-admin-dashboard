import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import Listings from './Listings'

// const Dashboard = lazy(() => import('./dashboard/DashboardComponent'));

function PrivateRoutes() {
    return (
        <Switch>
            <Route exact path={SLUGS.dashboard} render={() => <div>dashboard</div>} />
            <Route exact path={SLUGS.websiteTwo} render={() => <div>websiteTwo</div>} />
            <Route exact path={SLUGS.websiteThree} render={() => <div>websiteThree</div>} />
            <Route exact path={SLUGS.website} render={() => <div>website</div>} />
            <Route exact path={SLUGS.visitors} render={() => <div>visitors</div>} />
            <Route exact path={SLUGS.reviewsTwo} render={() => <div>reviewsTwo</div>} />
            <Route exact path={SLUGS.reviewsThree} render={() => <div>reviewsThree</div>} />
            <Route exact path={SLUGS.reviews} render={() => <div>reviews</div>} />
            <Route exact path={SLUGS.listings} component={Listings} />
            <Route exact path={SLUGS.appointments} render={() => <div>appointments</div>} />
            <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
            <Redirect to={SLUGS.dashboard} />
        </Switch>
    );
}

export default PrivateRoutes;
