import React from 'react'
import { Link , Route , Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'

import App from './App';

function erying() {
    return <h2>二营</h2>
}

function qibinglian() {
    return <h2>三营</h2>
}


@connect(
    state => state.auth,
    {logout}
)
class Dashboard extends React.Component {
    render() {
        const match = this.props.match;
        const redireatToLogin = <Redirect to="/login"/>;
        const app = (<div>
            {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
            <ul>
                <li>
                    <Link to={`${match.url}`}>一营</Link>
                </li>
                <li>
                    <Link to={`${match.url}/erying`}>二营</Link>
                </li>
                <li>
                    <Link to={`${match.url}/qibinglian`}>三营</Link>
                </li>
            </ul>
            <Route path={`${match.url}/`} exact component={App}/>
            <Route path={`${match.url}/erying`} component={erying}/>
            <Route path={`${match.url}/qibinglian`} component={qibinglian}/>
        </div>);
        return this.props.isAuth ? app : redireatToLogin;
    }
}


export default Dashboard




