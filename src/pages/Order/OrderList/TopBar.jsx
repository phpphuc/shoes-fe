import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import { getFilterValue, setFilterValueHandler } from '../../../utils/filterValueHelpper';
import ShowWithFunc from '../../../components/ShowWithFunc';

export default function TopBar({ filters, setFilters }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <div></div>
                <ShowWithFunc func="order/add">
                    <Link to="/order/add" className="btn btn-md btn-blue">
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        <span className="ml-2">Thêm hoá đơn</span>
                    </Link>
                </ShowWithFunc>
            </div>
            <div className="space-y-2">
                <div className="flex space-x-4">
                    <div className="w-[300px]">
                        <label className="label !mb-0 cursor-default text-sm">Số điện thoại</label>
                        <input
                            className="text-input"
                            placeholder="Tìm theo số điện thoại"
                            value={getFilterValue('phone', filters) || ''}
                            onChange={(e) =>
                                setFilters(setFilterValueHandler('phone', e.target.value))
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <label className="label !mb-0 cursor-default text-sm">
                            Ngày lập hoá đơn
                        </label>
                        <Datepicker
                            value={getFilterValue('createdAt', filters)}
                            i18n={'en'}
                            configs={{
                                shortcuts: {
                                    today: 'Hôm nay',
                                    yesterday: 'Hôm qua',
                                    past: (period) => `${period} ngày trước`,
                                    currentMonth: 'Tháng này',
                                    pastMonth: 'Tháng trước',
                                },
                            }}
                            inputClassName="border-2 border-slate-300 outline-none rounded w-full text-base !py-1.5 hover:border-blue-500"
                            displayFormat={'DD/MM/YYYY'}
                            separator={'đến'}
                            onChange={(newValue) =>
                                setFilters(setFilterValueHandler('createdAt', newValue))
                            }
                            showShortcuts={true}
                        />
                    </div>
                    <div className="w-[300px]">
                        <label className="label !mb-0 cursor-default text-sm">Giá</label>
                        <div className="flex items-center space-x-1">
                            <input
                                className="text-input"
                                placeholder="Từ"
                                value={getFilterValue('totalPrice', filters)?.min || ''}
                                onChange={(e) =>
                                    setFilters(
                                        setFilterValueHandler('totalPrice', (prev) => ({
                                            ...prev,
                                            min: e.target.value,
                                        }))
                                    )
                                }
                            />
                            <div>-</div>
                            <input
                                className="text-input"
                                placeholder="Đến"
                                value={getFilterValue('totalPrice', filters)?.max || ''}
                                onChange={(e) =>
                                    setFilters(
                                        setFilterValueHandler('totalPrice', (prev) => ({
                                            ...prev,
                                            max: e.target.value,
                                        }))
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="w-[300px]">
                        <label className="label !mb-0 cursor-default text-sm">Thành tiền</label>
                        <div className="flex items-center space-x-1">
                            <input
                                className="text-input"
                                placeholder="Từ"
                                value={getFilterValue('intoMoney', filters)?.min || ''}
                                onChange={(e) =>
                                    setFilters(
                                        setFilterValueHandler('intoMoney', (prev) => ({
                                            ...prev,
                                            min: e.target.value,
                                        }))
                                    )
                                }
                            />
                            <div>-</div>
                            <input
                                className="text-input"
                                placeholder="Đến"
                                value={getFilterValue('intoMoney', filters)?.max || ''}
                                onChange={(e) =>
                                    setFilters(
                                        setFilterValueHandler('intoMoney', (prev) => ({
                                            ...prev,
                                            max: e.target.value,
                                        }))
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-[400px]">
                        <label className="label !mb-0 cursor-default text-sm">
                            Trạng thái giao hàng
                        </label>
                        <div className="flex h-9 items-center space-x-3">
                            <div
                                className="inline-flex items-center"
                                onClick={() =>
                                    setFilters(
                                        setFilterValueHandler('deliveryStatus', (prev) => ({
                                            ...prev,
                                            delivered: !prev.delivered,
                                        }))
                                    )
                                }
                            >
                                <input
                                    className="!h-5 !w-5 accent-blue-600"
                                    type="checkbox"
                                    readOnly
                                    checked={getFilterValue('deliveryStatus', filters).delivered}
                                />
                                <label className="cursor-pointer pl-2 font-semibold text-green-700">
                                    Đã giao
                                </label>
                            </div>
                            <div
                                className="inline-flex items-center"
                                onClick={() =>
                                    setFilters(
                                        setFilterValueHandler('deliveryStatus', (prev) => ({
                                            ...prev,
                                            pending: !prev.pending,
                                        }))
                                    )
                                }
                            >
                                <input
                                    className="!h-5 !w-5 accent-blue-600"
                                    type="checkbox"
                                    readOnly
                                    checked={getFilterValue('deliveryStatus', filters).pending}
                                />
                                <label
                                    htmlFor="de-2"
                                    className="cursor-pointer pl-2 font-semibold text-orange-600"
                                >
                                    Đang chờ
                                </label>
                            </div>
                            <div
                                className="inline-flex items-center"
                                onClick={() =>
                                    setFilters(
                                        setFilterValueHandler('deliveryStatus', (prev) => ({
                                            ...prev,
                                            aborted: !prev.aborted,
                                        }))
                                    )
                                }
                            >
                                <input
                                    className="!h-5 !w-5 accent-blue-600"
                                    type="checkbox"
                                    readOnly
                                    checked={getFilterValue('deliveryStatus', filters).aborted}
                                />
                                <label
                                    htmlFor="de-2"
                                    className="cursor-pointer pl-2 font-semibold text-red-600"
                                >
                                    Đã huỷ
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="w-[400px]">
                        <label className="label !mb-0 cursor-default text-sm">
                            Trạng thái thanh toán
                        </label>
                        <div className="flex h-9 items-center space-x-3">
                            <div
                                className="inline-flex items-center"
                                onClick={() =>
                                    setFilters(
                                        setFilterValueHandler('paymentStatus', (prev) => ({
                                            ...prev,
                                            paid: !prev.paid,
                                        }))
                                    )
                                }
                            >
                                <input
                                    className="!h-5 !w-5 accent-blue-600"
                                    type="checkbox"
                                    readOnly
                                    checked={getFilterValue('paymentStatus', filters).paid}
                                />
                                <label className="cursor-pointer pl-2 font-semibold text-green-700">
                                    Đã thanh toán
                                </label>
                            </div>
                            <div
                                className="inline-flex items-center"
                                onClick={() =>
                                    setFilters(
                                        setFilterValueHandler('paymentStatus', (prev) => ({
                                            ...prev,
                                            unpaid: !prev.unpaid,
                                        }))
                                    )
                                }
                            >
                                <input
                                    className="!h-5 !w-5 accent-blue-600"
                                    type="checkbox"
                                    readOnly
                                    checked={getFilterValue('paymentStatus', filters).unpaid}
                                />
                                <label
                                    htmlFor="de-2"
                                    className="cursor-pointer pl-2 font-semibold text-orange-600"
                                >
                                    Chưa thanh toán
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
