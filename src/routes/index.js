// Layouts
import FullLayout from '../layouts/FullLayout';

// Pages
import Home from '../pages/Home';
import Accounts from '../pages/Account';
import AddAccount from '../pages/AddAccount';
import DetailAccount from '../pages/DetailAccount';
import UpdateAccount from '../pages/UpdateAccount';
import ProductTypeList from '../pages/ProductType/ProductTypeList';
import Customers from '../pages/Customers';
import Statistic from '../pages/Statistic';
import DetailCustomer from '../pages/DetailCustomer';
import Login from '../pages/Login';
import Roles from '../pages/Roles';
import AddRole from '../pages/AddRole';
import UpdateRole from '../pages/UpdateRole';
import AddCustomer from '../pages/AddCustomer';
import UpdateCustomer from '../pages/UpdateCustomer';
import DetailRole from '../pages/DetailRole';
import ProductList from '../pages/Product/ProductList';
import ProductDetail from '../pages/Product/ProductDetail';
import AddProduct from '../pages/Product/AddProduct';
import UpdateProduct from '../pages/Product/UpdateProduct';
import AddProductType from '../pages/ProductType/AddProductType';
import ProductTypeDetail from '../pages/ProductType/ProductTypeDetail';
import UpdateProductType from '../pages/ProductType/UpdateProductType';
import OrderList from '../pages/Order/OrderList';
import AddOrder from '../pages/Order/AddOrder';
import OrderDetail from '../pages/Order/OrderDetail';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },

    // ORDER
    {
        path: '/order',
        component: OrderList,
        props: {
            heading: 'Danh sách hoá đơn',
        },
    },

    {
        path: '/order/add',
        component: AddOrder,
        props: {
            heading: 'Đặt thêm sản phẩm',
        },
    },
    {
        path: '/order/detail/:id',
        component: OrderDetail,
        props: {
            heading: 'Chi tiết hoá đơn',
        },
    },
    {
        path: 'order/statistic',
        component: Statistic,
        props: {
            heading: 'Thống kê',
        },
    },

    // PRODUCT
    {
        path: '/product',
        component: ProductList,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/product/detail/:id',
        component: ProductDetail,
        props: {
            heading: 'Chi tiết sản phẩm',
        },
    },
    {
        path: '/product/add',
        component: AddProduct,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
    {
        path: '/product/update/:id',
        component: UpdateProduct,
        props: {
            heading: 'Chỉnh sửa sản phẩm',
        },
    },

    // PRODUCT TYPE
    {
        path: '/product-type',
        component: ProductTypeList,
        props: {
            heading: 'Danh sách loại cây',
        },
    },
    {
        path: '/product-type/add',
        component: AddProductType,
        props: {
            heading: 'Thêm mới loại sản phẩm',
        },
    },
    {
        path: '/product-type/detail/:id',
        component: ProductTypeDetail,
        props: {
            heading: 'Chi tiết loại sản phẩm',
        },
    },
    {
        path: '/product-type/update/:id',
        component: UpdateProductType,
        props: {
            heading: 'Chỉnh sửa loại sản phẩm',
        },
    },

    // CUSTOMER
    {
        path: '/customer',
        component: Customers,
        props: {
            heading: 'Khách hàng',
        },
    },
    {
        path: '/customer/detail/:id',
        component: DetailCustomer,
        props: {
            heading: 'Chi tiết khách hàng',
        },
    },
    {
        path: '/customer/add',
        component: AddCustomer,
        props: {
            heading: 'Thêm khách hàng',
        },
    },
    {
        path: '/customer/update/:id',
        component: UpdateCustomer,
        props: {
            heading: 'Chỉnh sửa khách hàng',
        },
    },
    // Account
    {
        path: '/account',
        component: Accounts,
        props: {
            heading: 'Tài khoản',
        },
    },
    {
        path: '/account/add',
        component: AddAccount,
        props: {
            heading: 'Thêm tài khoản',
        },
    },
    {
        path: '/account/update/:id',
        component: UpdateAccount,
        props: {
            heading: 'Chỉnh sửa tài khoản',
        },
    },
    {
        path: '/account/detail/:id',
        component: DetailAccount,
        props: {
            heading: 'Chi tiết tài khoản',
        },
    },

    // *****

    {
        path: '/role',
        component: Roles,
        props: {
            heading: 'Quy định',
        },
    },
    {
        path: '/role/add',
        component: AddRole,
        props: {
            heading: 'Thêm chức vụ',
        },
    },
    {
        path: '/role/detail/:id',
        component: DetailRole,
        props: {
            heading: 'Chi tiết chức vụ',
        },
    },
    {
        path: '/role/update/:id',
        component: UpdateRole,
        props: {
            heading: 'Sửa chức vụ',
        },
    },
    {
        path: '/roles/detail/:id',
        component: DetailRole,
        props: {
            heading: 'Chi tiết chức vụ',
        },
    },

    {
        path: '/login',
        layout: FullLayout,
        component: Login,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
