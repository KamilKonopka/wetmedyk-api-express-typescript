import { employeeGetAllAction } from "./controller/EmployeeGetAllAction.js";
import { employeeGetByIdAction } from "./controller/EmployeeGetByIdAction.js";
import { employeePostAction } from "./controller/EmployeePostAction.js";
import { employeeDeleteByIdAction } from "./controller/EmployeeDeleteByIdAction";
import { employeePutByIdAction } from "./controller/employeePutByIdAction";

const EMPLOYEE_ROUTE = '/employees';

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
    }
];
