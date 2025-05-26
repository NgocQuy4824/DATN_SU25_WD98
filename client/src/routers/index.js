import SignInPage from "../pages/Client/Auth/SignIn/SignInPage";
import SignUpPage from "../pages/Client/Auth/SignUp/SignUpPage";
import HomePage from "../pages/Client/HomePage/HomePage";
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage";
import ProductsDetailPage from "../pages/Client/ProductsDetailPage/ProductsDetailPage";
import ProductsPage from "../pages/Client/ProductsPage/ProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/products/:id',
        page: ProductsDetailPage,
        isShowHeader: true,
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false,
    },
]