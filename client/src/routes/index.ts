import {ComponentType} from "react";
import {Login} from "../pages/Login";
import {Books} from "../pages/Books";
import {MapComponent} from '../pages/MapComponent';
import {Cabinet} from '../pages/Cabinet';

export interface IRoute {
    path: string,
    component: ComponentType,
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    BOOK = '/',
    MAP = '/map',
    CABINET = '/cabinet'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: true}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.BOOK, component: Books, exact: true},
    {path: RouteNames.MAP, component: MapComponent, exact: true},
    {path: RouteNames.CABINET, component: Cabinet, exact: true},
]
