import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import TimeNow from '../../../components/TimeNow';
import PriceFormat from '../../../components/PriceFormat';
import { useDispatch, useSelector } from 'react-redux';
import { orderSelector } from '../../../redux/selectors';
import { orderActions } from '../../../redux/slices/orderSlice';
import { useMemo } from 'react';
import PriceInput from '../../../components/PriceInput';
import { toast, ToastContainer } from 'react-toastify';
import ProductCard from '../../../components/ProductCard';
import { Scrollbars } from 'react-custom-scrollbars';
import removeVietnameseTones from '../../../utils/removeVietnameseTones';
import useModal from '../../../hooks/useModal';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Table from '../../../components/Table';
import Pagination from '../../../components/Table/Pagination';
import HeaderCell from '../../../components/Table/HeaderCell';
import PaymentDialog from './PaymentDialog';

function ChooseSizeDialog({ close, meta }) {
    return (
        <div
            className={clsx(
                'fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 opacity-100 transition-opacity'
            )}
            onClick={() => close()}
        >
            <div
                className="min-w-[300px] max-w-[400px] rounded-lg bg-white p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center text-lg font-bold">Chọn size</div>
                <div className="mt-3 flex flex-wrap">
                    {meta?.productSizes?.map((s, i) => (
                        <div
                            key={i}
                            className={clsx(
                                'mr-2 mb-2 cursor-pointer rounded border px-3 py-2 hover:border-blue-500',
                                {
                                    'pointer-events-none bg-slate-300 opacity-50': s.quantity <= 0,
                                }
                            )}
                            onClick={() => {
                                meta?.onChooseSize(s, meta?.product?.price);
                                close();
                            }}
                        >
                            {s.size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function NameAndImageCell({ row, getValue }) {
    const image = row.getValue('image');
    return (
        <div className="flex items-center space-x-2">
            <img
                src={image || '/placeholder.png'}
                className="h-10 w-10 rounded-full border object-cover"
            />
            <p className="flex-1">{getValue()}</p>
        </div>
    );
}

function ActionCell({ table, row }) {
    const _id = row.getValue('_id');
    return (
        <div className="flex justify-end">
            <button
                className="text-red-500 hover:text-red-400"
                onClick={() => table.options.meta?.onDeleteProduct(_id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
        </div>
    );
}

function QuantityCell({ getValue, table, row }) {
    const quantity = getValue();
    const _id = row.getValue('_id');
    return (
        <div className="flex justify-end">
            <input
                type="number"
                min="1"
                value={quantity || ''}
                onChange={(e) => table.options.meta?.onUpdateQuantityProduct(_id, e.target.value)}
                className={clsx('text-input w-14 py-1 text-right text-base')}
            />
        </div>
    );
}

const columns = [
    {
        accessorKey: 'id',
        header: (props) => (
            <HeaderCell align="center" tableProps={props}>
                Mã
            </HeaderCell>
        ),
        cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
        size: 80,
    },
    {
        accessorKey: 'name',
        header: (props) => <HeaderCell tableProps={props}>Tên</HeaderCell>,
        cell: NameAndImageCell,
        size: 'full',
    },
    {
        accessorKey: 'size',
        header: (props) => (
            <HeaderCell align="center" tableProps={props}>
                Size
            </HeaderCell>
        ),
        cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
        size: 80,
    },
    {
        accessorKey: 'price',
        header: (props) => (
            <HeaderCell align="right" tableProps={props}>
                Giá
            </HeaderCell>
        ),
        cell: ({ getValue }) => (
            <p className="text-right">
                <PriceFormat>{getValue()}</PriceFormat>
            </p>
        ),
        size: 100,
    },
    {
        accessorKey: 'orderQuantity',
        header: (props) => (
            <HeaderCell align="right" tableProps={props}>
                SL
            </HeaderCell>
        ),
        cell: QuantityCell,
        size: 100,
    },
    {
        id: 'action',
        header: '',
        cell: ActionCell,
        size: 50,
    },
    {
        accessorKey: 'image',
    },
    {
        accessorKey: '_id',
    },
];

function AddOrder() {
    const order = useSelector(orderSelector);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [idFilter, setIdFilter] = useState('');

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [renderProduct, setRenderProduct] = useState([]);

    const [openChooseSizeDialog, closeChooseSizeDialog] = useModal({
        modal: ChooseSizeDialog,
        meta: {
            onChooseSize: (productSize, price) =>
                dispatch(orderActions.add({ productSize, price })),
        },
    });

    const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                    setRenderProduct(resJson.products);
                } else {
                    setProducts([]);
                    setRenderProduct([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
                setRenderProduct([]);
            });
    }, []);

    // Render product list
    useEffect(() => {
        setRenderProduct(
            products
                .filter((product) => {
                    if (search === '') {
                        return product;
                    } else {
                        if (
                            removeVietnameseTones(product.name.toLowerCase()).includes(
                                removeVietnameseTones(search.toLowerCase())
                            )
                        ) {
                            var id = product.id.toString();
                            return product.id.toString().includes(id);
                        }
                    }
                })
                .filter((product) => {
                    if (!idFilter) {
                        return true;
                    }
                    return product.id == idFilter;
                })
        );
    }, [search, idFilter]);

    useEffect(() => {
        setSelectedProducts(
            order.details.map((detail) => {
                const matchedProduct = products.find(
                    (product) => product._id === detail.productSize.product
                );
                if (!matchedProduct) {
                    return {};
                }
                return {
                    _id: detail.productSize._id,
                    id: matchedProduct.id,
                    image: matchedProduct.images?.[0] || '/placeholder.png',
                    name: matchedProduct.name,
                    price: matchedProduct.price,
                    size: detail.productSize.size,
                    orderQuantity: detail.quantity,
                };
            })
        );
    }, [order, products]);

    const table = useReactTable({
        data: selectedProducts,
        columns,
        state: {
            columnVisibility: { image: false, _id: false },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        meta: {
            onUpdateQuantityProduct: (_id, quantity) =>
                dispatch(orderActions.updateQuantity({ _id, quantity })),
            onDeleteProduct: (_id) => dispatch(orderActions.remove(_id)),
        },
    });

    return (
        <>
            <div className="container h-full w-full overflow-y-hidden py-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* LEFT VIEW */}
                    <div className="flex flex-1 flex-col rounded-l-md border py-3 px-2 dark:border-white/50">
                        {/* HEADER ACTION GROUP */}
                        <div className="flex space-x-2 pb-2">
                            {/* ID */}
                            <input
                                type="text"
                                className="text-input w-16 py-1 dark:bg-white/5 dark:text-slate-200"
                                value={idFilter}
                                onChange={(e) => {
                                    setIdFilter(e.target.value);
                                }}
                                placeholder="Mã"
                            />
                            {/* Search */}
                            <input
                                type="text"
                                className="text-input flex-1 py-1 dark:bg-white/5 dark:text-slate-200"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                placeholder="Tìm kiếm sản phẩm"
                            />
                        </div>

                        {/* LIST PRODUCT */}
                        <div className="flex-1">
                            <Scrollbars autoHide autoHideTimeout={4000} autoHideDuration={200}>
                                <div className="grid grid-cols-3 gap-2">
                                    {renderProduct.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onProductClick={() =>
                                                openChooseSizeDialog({
                                                    productSizes: product.sizes,
                                                    product: product,
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>

                    {/* RIGHT ORDER */}
                    <div className="flex h-full min-w-full flex-1 flex-col rounded-r-md border py-5 px-2 dark:border-white/50">
                        <p className="text-center text-lg font-semibold dark:text-slate-200">Hóa đơn</p>

                        {/* LIST PRODUCT */}
                        <div className="mt-3 flex-1">
                            <Table
                                table={table}
                                notFoundMessage="Chưa có sản phẩm trong hoá đơn"
                                rowClickable={false}
                            />
                            <Pagination table={table} />
                        </div>

                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <p className="font-semibold dark:text-white">
                                    <span>Tổng tiền: </span>
                                    <span className="text-xl text-blue-600">
                                        <span>
                                            <PriceFormat>{order.totalPrice}</PriceFormat>
                                        </span>
                                        <span> VNĐ</span>
                                    </span>
                                </p>
                            </div>
                            <button
                                className={clsx('btn btn-blue btn-md')}
                                disabled={!order.totalPrice}
                                onClick={() => setIsOpenPaymentDialog(true)}
                            >
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Tạo hoá đơn</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenPaymentDialog && (
                <PaymentDialog
                    close={() => setIsOpenPaymentDialog(false)}
                    meta={{ selectedProducts, order }}
                />
            )}
        </>
    );
}

export default AddOrder;
