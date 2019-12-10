import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MaintenanceOrder from './maintenance-order';
import MaintenanceOrderDetail from './maintenance-order-detail';
import MaintenanceOrderUpdate from './maintenance-order-update';
import MaintenanceOrderDeleteDialog from './maintenance-order-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MaintenanceOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MaintenanceOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MaintenanceOrderDetail} />
      <ErrorBoundaryRoute path={match.url} component={MaintenanceOrder} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MaintenanceOrderDeleteDialog} />
  </>
);

export default Routes;
