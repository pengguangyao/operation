import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import {getRouterData} from './common/router';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history,app }) {
  const routerData = getRouterData(app);
  const BaseLayOut = routerData['/'].component;
  const NoMatch = routerData['/exception'].component;
  const Login = routerData['/login'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path="/" component={BaseLayOut}/>
        <Route component={NoMatch}/>
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
