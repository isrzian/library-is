import {ComponentType} from "react";
import {Login} from "../pages/Login";
import {Books} from "../pages/Books";

export interface IRoute {
    path: string,
    component: ComponentType,
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    BOOK = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: true}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.BOOK, component: Books, exact: true}
]
