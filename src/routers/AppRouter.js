import React, { lazy, Suspense} from "react";
import { BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import Header from "../components/SubComponents/Header/Header";
import Footer from "../components/SubComponents/Footer/Footer";

import MetaDataTaggingApp from "../components/MetaDataTaggingApp";
import IndependentArtistsDashboard from "../components/Dashboards/PendingReleasesDashboard/IndependentArtistsDashboard.js";
import ExportDashboard from "../components/Dashboards/MetaDataDashboard/ExportMetaData";
import UploadAudio from "../components/Dashboards/UploadDashboard/UploadAudio";
import UploadMetadata from "../components/Dashboards/UploadDashboard/UploadMetadata";

import Loader from "../components/SubComponents/Loader/Loader";


// the router handles client side rendering of routes
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Route path='/' component={MetaDataTaggingApp} exact={true}/>
        <Switch>
          <Route path='/background-instrumentals/' component={MetaDataTaggingApp} exact={true}/>
          <Route path='/independent-artists/' component={MetaDataTaggingApp} exact={true}/>
          <Route path='/exports/' component={ExportDashboard} exact={true}/>
          <Route path='/upload-audio/' component={UploadAudio} exact={true}/>
          <Route path='/upload-metadata/' component={UploadMetadata} exact={true}/>
        </Switch>
      </Suspense>
      <Route component={Footer}/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
