import { EmployeeController } from "./controller/EmployeeController";
import { PostController } from "./controller/PostController";
import { LocationController } from "./controller/LocationController";
import { AuthenticationController } from "./controller/AuthenticationController";
import { NewsletterController } from "./controller/NewsletterController";
import { MediaController } from "./controller/MediaController";
import { UserController } from "./controller/UserController";
import {ServiceController} from "./controller/ServiceController";

const EMPLOYEE_ROUTE = '/employees';
const LOCATION_ROUTE = '/locations';
const POST_ROUTE = '/posts';
const SERVICE_PATH = '/services';

const employeesController = new EmployeeController();
const postsController = new PostController();
const locationsController = new LocationController();
const authController = new AuthenticationController();
const newsletterController = new NewsletterController();
const mediaController = new MediaController();
const userController = new UserController();
const serviceController = new ServiceController();

export const AppRoutes = [
    {
        path: EMPLOYEE_ROUTE,
        method: 'get',
        action: employeesController.getAll,
        requireJwt: false,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'get',
        action: employeesController.getById,
        requireJwt: false,
    },
    {
        path: EMPLOYEE_ROUTE,
        method: 'post',
        action: employeesController.post,
        requireJwt: true,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'delete',
        action: employeesController.deleteById,
        requireJwt: true,
    },
    {
        path: `${EMPLOYEE_ROUTE}/:id`,
        method: 'put',
        action: employeesController.putById,
        requireJwt: true,
    },
    {
        path: LOCATION_ROUTE,
        method: 'get',
        action: locationsController.getAll,
        requireJwt: false,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'get',
        action: locationsController.getById,
        requireJwt: false,
    },
    {
        path: LOCATION_ROUTE,
        method: 'post',
        action: locationsController.post,
        requireJwt: true,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'put',
        action: locationsController.putById,
        requireJwt: true,
    },
    {
        path: `${LOCATION_ROUTE}/:id`,
        method: 'delete',
        action: locationsController.deleteById,
        requireJwt: true,
    },
    {
        path: POST_ROUTE,
        method: 'get',
        action: postsController.getAll,
        requireJwt: false,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'get',
        action: postsController.getById,
        requireJwt: false,
    },
    {
        path: POST_ROUTE,
        method: 'post',
        action: postsController.post,
        requireJwt: true,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'put',
        action: postsController.putById,
        requireJwt: true,
    },
    {
        path: `${POST_ROUTE}/:id`,
        method: 'delete',
        action: postsController.deleteById,
        requireJwt: true,
    },
    {
        path: '/upload',
        method: 'post',
        action: mediaController.post,
        requireJwt: true,
    },
    {
        path: '/images',
        method: 'get',
        action: mediaController.getAll,
        requireJwt: false,
    },
    {
        path: '/images/:id',
        method: 'delete',
        action: mediaController.deleteById,
        requireJwt: true,
    },
    {
        path: '/authenticate',
        method: 'post',
        action: authController.post,
        requireJwt: false,
    },
    {
        path: '/authenticate',
        method: 'get',
        action: authController.getById,
        requireJwt: true,
    },
    {
        path: '/signup',
        method: 'post',
        action: userController.post,
        requireJwt: false,
    },
    {
        path: '/users',
        method: 'get',
        action: userController.getAll,
        requireJwt: true,
    },
    {
        path: '/users/:id',
        method: 'get',
        action: userController.getById,
        requireJwt: true,
    },
    {
        path: '/newsletter',
        method: 'post',
        action: newsletterController.post,
        requireJwt: false,
    },
    {
        path: '/newsletter',
        method: 'delete',
        action: newsletterController.deleteById,
        requireJwt: false,
    },
    {
        path: '/users/:id',
        method: 'delete',
        action: userController.deleteById,
        requireJwt: true,
    },
    {
        path: SERVICE_PATH,
        method: 'get',
        action: serviceController.getAll,
        requireJwt: false,
    },
    {
        path: `${SERVICE_PATH}/:id`,
        method: 'get',
        action: serviceController.getById,
        requireJwt: false,
    },
    {
        path: SERVICE_PATH,
        method: 'post',
        action: serviceController.post,
        requireJwt: true,
    },
    {
        path: `${SERVICE_PATH}/:id`,
        method: 'put',
        action: serviceController.putById,
        requireJwt: true,
    },
    {
        path: `${SERVICE_PATH}/:id`,
        method: 'delete',
        action: serviceController.deleteById,
        requireJwt: true,
    },
];
