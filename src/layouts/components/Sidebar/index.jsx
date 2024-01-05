import GroupMenu from './GroupMenu';
import { Scrollbars } from 'react-custom-scrollbars';
import { toast } from 'react-toastify';

const groupMenus = [
    {
        main: {
            iconClassname: 'fa-solid fa-house',
            text: 'Trang chủ',
            link: '/',
        },
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Hoá đơn',
            link: '/order',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'order/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'order/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Phiếu nhập',
            link: '/import',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'import/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'import/add',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Sản phẩm',
            link: '/product',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product/add',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-boxes-stacked',
            text: 'Loại sản phẩm',
            link: '/product-type',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product-type/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product-type/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Phiếu giảm giá',
            link: '/coupon',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'coupon/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'coupon/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-users',
            text: 'Khách hàng',
            link: '/customer',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'customer/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'customer/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Thống kê',
            link: '/statistic',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Sản phẩm',
                link: '/product',
                functionName: 'statistic/product',
            },
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Doanh số',
                link: '/profit',
                functionName: 'statistic/profit',
            },
        ],
    },
    {
        main: {
            iconClassname: ' fa-solid fa-user',
            text: 'Tài khoản',
            link: '/account',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'account/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'account/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Chức vụ',
            link: '/role',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'role/view',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'role/add',
            },
        ],
    },
];

function Sidebar() {
    return (
        <div className="h-full min-w-[240px] bg-blue-500 dark:bg-gray-900">
            <header className="flex h-20 w-full flex-col items-center justify-center border-b border-white/40 text-white">
                <div className="text-lg font-extrabold">QUẢN LÝ</div>
                <div className="font-bold">CỬA HÀNG CÂY XANH</div>
            </header>

            <div className="">
                <Scrollbars
                    autoHide
                    autoHideTimeout={4000}
                    autoHeight
                    autoHideDuration={200}
                    autoHeightMin={`calc(100vh - 80px)`}
                >
                    <ul
                        className="flex h-full flex-col space-y-0.5 p-2"
                        style={{ overflowY: 'overlay' }}
                    >
                        {groupMenus.map((groupMenu, index) => (
                            <GroupMenu key={index} groupMenu={groupMenu} />
                        ))}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;
