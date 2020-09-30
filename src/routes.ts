import { employeeGetAllAction } from "./controller/EmployeeGetAllAction.js";
import { employeeGetByIdAction } from "./controller/EmployeeGetByIdAction.js";
import { employeePostAction } from "./controller/EmployeePostAction.js";
import { employeeDeleteByIdAction } from "./controller/EmployeeDeleteByIdAction";
import { employeePutByIdAction } from "./controller/employeePutByIdAction";
import { locationGetAllAction } from "./controller/LocationGetAllAction";
import { locationGetByIdAction } from "./controller/LocationGetByIdAction";
import { locationPostAction } from "./controller/LocationPostAction";
import { locationPutById } from "./controller/LocationPutByIdAction";
import { locationDeleteById } from "./controller/LocationDeleteByIdAction";
import { postGetAllAction } from "./controller/PostGetAllAction.js";
import { postGetByIdAction } from "./controller/PostGetByIdAction";
import { postPostAction } from "./controller/PostPostAction";
import { postPutByIdAction } from "./controller/PostPutByIdAction";
import { postDeleteByIdAction } from "./controller/PostDeleteByIdAction";
import { filePostAction } from "./controller/FilePostAction";
import { imagesGetAllNames } from "./controller/ImagesGetAllNames";
import { authenticateAction } from "./controller/AuthenticateAction";
import { authenticateGetSession } from "./controller/AuthenticateGetSession";
import { createUserAction } from "./controller/CreateUserAction";

const EMPLOYEE_ROUTE = '/employees';
const LOCATION_ROUTE = '/locations';
const POST_ROUTE = '/posts';

export const AppRoutes = [
    {
        path: EMPLOYEE_ROUTE,
        method: 'get',
        action: employeeGetAllAction,
        requireJwt: true,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'get',
        action: employeeGetByIdAction,
        requireJwt: true,
    },
    {
        path: EMPLOYEE_ROUTE,
        method: 'post',
        action: employeePostAction,
        requireJwt: true,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'delete',
        action: employeeDeleteByIdAction,
        requireJwt: true,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'put',
        action: employeePutByIdAction,
        requireJwt: true,
    },
    {
        path: LOCATION_ROUTE,
        method: 'get',
        action: locationGetAllAction,
        requireJwt: true,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'get',
        action: locationGetByIdAction,
        requireJwt: true,
    },
    {
        path: LOCATION_ROUTE,
        method: 'post',
        action: locationPostAction,
        requireJwt: true,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'put',
        action: locationPutById,
        requireJwt: true,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'delete',
        action: locationDeleteById,
        requireJwt: true,
    },
    {
        path: POST_ROUTE,
        method: 'get',
        action: postGetAllAction,
        requireJwt: true,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'get',
        action: postGetByIdAction,
        requireJwt: true,
    },
    {
        path: POST_ROUTE,
        method: 'post',
        action: postPostAction,
        requireJwt: true,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'put',
        action: postPutByIdAction,
        requireJwt: true,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'delete',
        action: postDeleteByIdAction,
        requireJwt: true,
    },
    {
        path: '/upload',
        method: 'post',
        action: filePostAction,
        requireJwt: true,
    },
    {
        path: '/images',
        method: 'get',
        action: imagesGetAllNames,
        requireJwt: true,
    },
    {
        path: '/authenticate',
        method: 'post',
        action: authenticateAction,
        requireJwt: false,
    },
    {
        path: '/authenticate',
        method: 'get',
        action: authenticateGetSession,
        requireJwt: true,
    },
    {
        path: '/signup',
        method: 'post',
        action: createUserAction,
        requireJwt: false,
    }
];
