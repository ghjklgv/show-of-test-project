import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import GeoLib from './GeoLib/geoLib'
import GeoCreAndEdite from './GeoLib/geoCreAndEdite'
// import EvaluationList from './evaluation/evaluationList'
// import HeapMap from './heapMap/heapMap'
// import Parent from './heapMap/test'

import { Layout } from 'antd'

const { Content } = Layout

interface IMyProps {}

interface IMyState {
  isAdmin: boolean | undefined
  specialAccess: any
}

export default class LayoutTemplate extends React.Component<
  IMyProps,
  IMyState
> {
  // service = new CheckService(this)

  constructor (props) {
    super(props)
    this.state = {
      isAdmin: undefined,
      specialAccess: []
    }
  }

  renderOwnerComponent = (Component, props) => {
    return <Component {...props} isAdmin={true} />
  }

  render () {
    return (
      <HashRouter>
        <Layout className='geo-lib-wrapper'>
          {/* <Sider width={300}>
            {/* <Route path='/:type?/:page?/:sub?' render={this.renderMenu} /> */}
          {/* </Sider> */}
          <Layout className='geo-lib-layout'>
            <Content>
              <Switch>
                <Route
                  path='/'
                  exact={true}
                  render={this.renderOwnerComponent.bind(this, GeoLib)}
                />
                {/* <Route
                  path='/GeoCreAndEdite/create'
                  exact={true}
                  render={this.renderOwnerComponent.bind(this, GeoCreAndEdite)}
                /> */}
                {/* <Route
                  path='/heapMap'
                  exact={true}
                  render={this.renderOwnerComponent.bind(this, Parent)}
                /> */}
                <Route
                  path='/GeoCreAndEdite/:type/:id?'
                  exact={true}
                  render={this.renderOwnerComponent.bind(this, GeoCreAndEdite)}
                />
                {/* <Route
                  path='/GeoCreAndEdite/create/assignor'
                  exact={true}
                  render={this.renderOwnerComponent.bind(this, GeoCreAndEdite)}
                />
                 */}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}
