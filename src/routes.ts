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

const EMPLOYEE_ROUTE = '/employees';
const LOCATION_ROUTE = '/locations';
const POST_ROUTE = '/posts';

export const AppRoutes = [
    {
        path: EMPLOYEE_ROUTE,
        method: 'get',
        action: employeeGetAllAction,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'get',
        action: employeeGetByIdAction,
    },
    {
        path: EMPLOYEE_ROUTE,
        method: 'post',
        action: employeePostAction,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'delete',
        action: employeeDeleteByIdAction,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'put',
        action: employeePutByIdAction,
    },
    {
        path: LOCATION_ROUTE,
        method: 'get',
        action: locationGetAllAction,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'get',
        action: locationGetByIdAction,
    },
    {
        path: LOCATION_ROUTE,
        method: 'post',
        action: locationPostAction,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'put',
        action: locationPutById,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'delete',
        action: locationDeleteById,
    },
    {
        path: POST_ROUTE,
        method: 'get',
        action: postGetAllAction,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'get',
        action: postGetByIdAction,
    },
    {
        path: POST_ROUTE,
        method: 'post',
        action: postPostAction,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'put',
        action: postPutByIdAction,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'delete',
        action: postDeleteByIdAction,
    },
    {
        path: '/upload',
        method: 'post',
        action: filePostAction,
    },
    {
        path: '/images',
        method: 'get',
        action: imagesGetAllNames,
    },
    {
        path: '/authenticate',
        method: 'post',
        action: authenticateAction,
    },
    {
        path: '/authenticate',
        method: 'get',
        action: authenticateGetSession,
    }
];
