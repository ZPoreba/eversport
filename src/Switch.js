import React, {Component}  from "react";
import {Route, Switch} from "react-router-dom";
import DiscoverPage from "./components/DiscoverPage";

class MainSwitch extends Component {

    render() {
        return (
            <Switch>
                <Route exact path={["/", "/home"]} component={DiscoverPage} />
            </Switch>
        );
    }
}

export default MainSwitch;