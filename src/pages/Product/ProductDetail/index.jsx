import { Fragment, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import TypeProduct from '../../../components/TypeProduct';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { accountSelector } from '../../../redux/selectors';
import HeaderCell from '../../../components/Table/HeaderCell';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Pagination from '../../../components/Table/Pagination';
import Table from '../../../components/Table';
import range from '../../../utils/range';
import SizesInput from '../../../components/SizesInput';
import useModal from '../../../hooks/useModal';
import DeleteDialog from '../../../components/DeleteDialog';

function ActionCell({ table, row }) {
    return (
        <div className="flex justify-end">
            <button
                className="btn btn-red px-3 py-1"
                onClick={(e) => {
                    e.stopPropagation();
                    table.options.meta?.onDeleteButtonClick(row);
                }}
            >
                Xoá
            </button>
        </div>
    );
}

const columns = [
    {
        accessorKey: 'size',
        header: (props) => (
            <HeaderCell align="center" tableProps={props}>
                Size
            </HeaderCell>
        ),
        cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
        size: 'full',
    },
    {
        accessorKey: 'quantity',
        header: (props) => (
            <HeaderCell align="center" tableProps={props}>
                Kho
            </HeaderCell>
        ),
        cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
        size: 150,
    },
    {
        accessorKey: 'saledQuantity',
        header: (props) => (
            <HeaderCell align="center" tableProps={props}>
                Đã bán
            </HeaderCell>
        ),
        cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
        size: 150,
    },
    {
        id: 'action',
        cell: ActionCell,
        size: 100,
    },
    {
        accessorKey: 'id',
    },
];

function ProductDetail() {
    // const account = useSelector(accountSelector);
    // function isHiddenItem(functionName) {
    //     if (!account) {
    //         return true;
    //     }
    //     if (!functionName) {
    //         return false;
    //     }
    //     const findResult = account?.functions?.find((_func) => _func?.name === functionName);
    //     if (findResult) {
    //         return false;
    //     }
    //     return true;
    // }
    const { id } = useParams();
    const navigate = useNavigate();
    const [sizeLoading, setSizeLoading] = useState(false);

    const [openDeleteDialog, closeDeleteDialog] = useModal({
        modal: DeleteDialog,
        meta: {
            onDelete: handleDeleteSize,
        },
    });

    useEffect(() => {
        getProduct();
    }, []);

    const [product, setProduct] = useState({});
    const [selectedSizes, setSelectedSizes] = useState([]);
    function getProduct() {
        fetch('http://localhost:5000/api/product' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    const _product = resJson.product;
                    _product.quantity = _product.sizes.reduce(
                        (prev, curr) => curr.quantity + prev,
                        0
                    );
                    _product.saledQuantity = _product.sizes.reduce(
                        (prev, curr) => curr.saledQuantity + prev,
                        0
                    );

                    _product.sizes?.sort((s1, s2) => s1.size - s2.size);

                    setProduct(_product);
                } else {
                    setProduct({});
                }
            });
    }

    function handleAddSizes() {
        setSizeLoading(true);
        const addSizesPromise = selectedSizes.map(async (size) => {
            const res = await fetch('http://localhost:5000/api/product-size', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: product?._id,
                    size,
                }),
            });
            const resJson = await res.json();
            if (!resJson.success) {
                throw new Error();
            }
            return resJson;
        });

        Promise.all(addSizesPromise)
            .then(() => {
                toast.success('Thêm size thành công!');
                getProduct();
                setSelectedSizes([]);
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra!');
            })
            .finally(() => {
                setSizeLoading(false);
            });
    }

    function handleDeleteSize(deleteId) {
        fetch('http://localhost:5000/api/product-size/' + deleteId, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (!resJson.success) {
                    throw new Error();
                }
                toast.success('Xoá size thành công');
                getProduct();
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra');
            })
            .finally(() => {
                closeDeleteDialog();
            });
    }

    const sizeTable = useReactTable({
        data: product?.sizes || [],
        columns,
        state: {
            columnVisibility: { id: false },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        meta: {
            onDeleteButtonClick: (row) => {
                openDeleteDialog({ deleteId: row.getValue('id') });
            },
        },
    });

    return (
        <div className="container max-w-[1000px]">
            <div>
                <div className="flex space-x-8">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-baseline space-x-3">
                            <p className="text-gray-600">Mã sản phẩm:</p>
                            <p className="text-lg font-bold text-blue-600">{product.id}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Tên sản phẩm:</p>
                            <p className="text-2xl font-semibold text-blue-600">{product.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Loại sản phẩm:</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {product.type?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-600">Ảnh:</p>
                            <div className="flex flex-wrap">
                                {product.images?.map((image, index) => (
                                    <div className="p-1" key={index}>
                                        <img
                                            src={image}
                                            className="h-[120px] w-[120px] rounded object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600">Mô tả sản phẩm:</p>
                            <p className="text-gray-900">{product.description}</p>
                        </div>

                        <div className="flex space-x-8">
                            <div>
                                <p className="text-gray-600">Giá nhập:</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    {product.importPrice + ' VNĐ'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Giá bán:</p>
                                <p className="text-2xl font-semibold text-green-700">
                                    {product.price + ' VNĐ'}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-8">
                            <div>
                                <p className="text-gray-600">Số lượng trong kho:</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    {product.quantity}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Số lượng đã bán:</p>
                                <p className="text-2xl font-semibold text-green-700">
                                    {product.saledQuantity}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600">Trạng thái:</p>
                            <p
                                className={clsx('text-xl font-semibold', {
                                    'text-green-600': product.status === 'active',
                                    'text-red-600': product.status === 'inactive',
                                })}
                            >
                                {product.status === 'active' ? 'Đang bán' : 'Không bán'}
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link to="/product" className="btn btn-blue btn-md">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Quay lại</span>
                            </Link>
                            <Link to={'/product/update/' + id} className="btn btn-yellow btn-md">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Chỉnh sửa</span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-[500px] space-y-8">
                        <div>
                            <Table table={sizeTable} notFoundMessage="Không có size" />
                            <Pagination table={sizeTable} initPageSize={5} />
                        </div>

                        <div>
                            <p className="mb-2 text-gray-600">Thêm size:</p>
                            <div className="relative">
                                <SizesInput
                                    selectedSizes={selectedSizes}
                                    onSelectedSizeChange={setSelectedSizes}
                                    disabledSizes={product.sizes?.map((s) => s.size)}
                                />
                                {selectedSizes.length !== 0 && (
                                    <div className="mt-2">
                                        <button
                                            className="btn btn-blue w-full py-2"
                                            onClick={handleAddSizes}
                                        >
                                            Thêm size
                                        </button>
                                    </div>
                                )}
                                {sizeLoading && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="h-9 w-9 animate-spin text-blue-600"
                                        >
                                            <circle
                                                className="opacity-50"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-6 flex items-center justify-end border-t pt-6">
                    <div className="flex">
                        <Link to={'/product'} className="btn btn-red btn-md">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Hủy</span>
                        </Link>
                        <button type="submit" className="btn btn-blue btn-md" disabled={loading}>
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Chỉnh sửa</span>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ProductDetail;
