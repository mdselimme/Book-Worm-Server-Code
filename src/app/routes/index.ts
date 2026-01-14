import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { UserRouter } from "../modules/user/user.route";
import { CategoriesRouter } from "../modules/categories/categories.route";
import { BookRouter } from "../modules/book/book.route";
import { ReviewRouter } from "../modules/review/review.route";
import { TutorialRouter } from "../modules/tutorial/tutorial.route";
import { ReadingRouter } from "../modules/reading/reading.route";


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
    },
    {
        path: "/book",
        route: BookRouter
    },
    {
        path: "/review",
        route: ReviewRouter
    },
    {
        path: "/tutorial",
        route: TutorialRouter
    },
    {
        path: "/reading",
        route: ReadingRouter
    },
];

allRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});
export default router;