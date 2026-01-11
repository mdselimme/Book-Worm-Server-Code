import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { UserRouter } from "../modules/user/user.route";
import { CategoriesRouter } from "../modules/categories/categories.route";


interface IRoute {
    path: string;
    route: Router;
}

const router = Router();

const allRoutes: IRoute[] = [
    {
        path: "/user",
        route: UserRouter
    },
    {
        path: "/auth",
        route: AuthRouter
    },
    {
        path: "/categories",
        route: CategoriesRouter
    }
];

allRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});
export default router;