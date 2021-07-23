import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashborad from '../pages/Dashboard'
import List from '../pages/List'
import Layout from '../components/Layout'

const App: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashborad} />
            <Route path="/list/:type" exact component={List} />
        </Switch>
    </Layout>
)

export default App
