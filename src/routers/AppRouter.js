import React, { lazy, Suspense} from 'react';
import { BrowserRouter, Link, NavLink, Route, Switch} from 'react-router-dom';
import Header from '../components/SubComponents/Header';
import Footer from '../components/SubComponents/Footer';

import MetaDataTaggingApp from '../components/MetaDataTaggingApp';
const PendingReleasesDashboard = lazy(() => import ('../components/Dashboards/PendingReleasesDashboard'));
import IndependentArtistsDashboard from '../components/Dashboards/IndependentArtistsDashboard.js'
import ExportDashboard from '../components/MetaDataDashboard/ExportMetaData';
import Loader from '../components/SubComponents/Loader';

// the router handles client side rendering of routes
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Route path='/' component={MetaDataTaggingApp} exact={true}/>
        <Switch>
          <Route path='/independent-artists/' component={MetaDataTaggingApp} exact={true}/>
          <Route path='/exports/' component={ExportDashboard} exact={true}/>
        </Switch>
      </Suspense>
      <Route children={Footer}/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
