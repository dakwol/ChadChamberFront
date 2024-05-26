import React from "react";
import HomePage from "../pages/HomePage/HomePage";

const isAuthenticated = localStorage.getItem("account");
const isAuthenticatedApplicant = localStorage.getItem("applicant");

export interface IRoute {
    path: string;
    element : React.ComponentType;
    exact?: boolean;
    params?: { [key: string]: string | number };
}

export enum RouteNames {
    LOGIN = '/login',
    HOMEPAGE = '/',
    PROFILE = '/profile',
    VACANCYCREATE = '/createjob',
    VACANCY = '/job',
    MYVACANCY = '/myjob',
    ABOUTUS = '/about',
    EVENTS = '/events',
    EXCURSIOS = '/excursios',
    NEWSOPENPAGE = '/newsopen',
    USERAGREEMENT = '/user-agreement',
}

export const navDate = [
  {
    id: 1,
    name: "О проекте",
    link: RouteNames.ABOUTUS,
  },
  {
    id: 2,
    name: "Вакансии",
    link: RouteNames.VACANCY,
  },
  {
    id: 3,
    name: "События",
    link: RouteNames.EVENTS,
  },
  {
    id: 4,
    name: "Экскурсии",
    link: RouteNames.EXCURSIOS, // Была ошибка в написании "Экскурсии"
  },
  {
    id: 6,
    name: "Пользовательское соглашение",
    link: RouteNames.USERAGREEMENT, // Укажите соответствующий маршрут или ссылку
  },
  !isAuthenticated ? // Если пользователь не аутентифицирован вообще
  {
    id: 5,
    name: "Я ищу сотрудника",
    link: RouteNames.LOGIN,
  }
  :
  isAuthenticatedApplicant ? // Если пользователь аутентифицирован как соискатель
  {}
  :
  { // Если пользователь аутентифицирован, но не как соискатель
    id: 5,
    name: "Я ищу сотрудника",
    link: RouteNames.MYVACANCY,
  }
];

export const publicRoutes: IRoute[] = [
  {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
]