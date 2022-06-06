import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const AppRouter = () => {
    const auth = useTypedSelector(state => state.auth.isAuth)
    return (
        auth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route {...route} key={route.path} />
                )}
                <Redirect to={RouteNames.BOOK} />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route {...route} key={route.path} />
                )}
                <Redirect to={RouteNames.LOGIN} />
            </Switch>
    )
}

