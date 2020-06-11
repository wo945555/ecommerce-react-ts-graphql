import * as React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar'

import{ Discover } from '../view/Discover'
import{ Browse } from '../view/Browse'
import { Detail } from '../view/Detail'
import { Signin } from '../components/Signin';
import { Signup } from '../components/Signup';
import { Checkout } from '../components/Checkout';


export type RouteComponentType = {
  path: string;
  component: React.FC | any;
  exact?: boolean;
}
export const RouterList: RouteComponentType[] = [
  { path: '/', component: Browse, exact: true },
  { path: '/browse', component: Browse },
  { path: '/detail/:id', component: Detail },
  // { path: '/signin', component: Signin },
  // { path: '/signup', component: Signup },
  // { path: '/checkout', component: Checkout },
  //{ path: '/', component:  },
]

export class RouterMap extends React.Component<{}> {
  public render () {
    return (<Router>
      <React.Fragment> 
        <Navbar />
        <Switch>
          {RouterList.map((route, i) =>
            <Route exact={route.exact || false}
              path={route.path}
              key={i}
              render={props=> <route.component {...props} />}
            />,
          )}
        </Switch>
      </React.Fragment>
    </Router>);
  }
}