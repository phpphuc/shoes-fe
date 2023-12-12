import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TypeProduct from '../../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';
import TimeNow from '../../../components/TimeNow';

import 'react-toastify/dist/ReactToastify.css';
import PriceInput from '../../../components/PriceInput';
import Condition from 'yup/lib/Condition';
import ProductTypeInput from '../../../components/ProductTypeInput';
import ImagesInput from '../../../components/ImagesInput';
import SizesInput from '../../../components/SizesInput';

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
    description: Yup.string().required('Trường này bắt buộc'),
    price: Yup.number().required('Trường này bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    importPrice: Yup.number().required('Trường này bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    type: Yup.string().required('Trường này bắt buộc'),
    sizes: Yup.array().min(1, 'Chọn ít nhất 1 size'),
});

function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const showSuccessNoti = () => toast.success('Tạo sản phẩm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const bacsicForm = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            price: '',
            importPrice: '',
            images: [],
            sizes: [],
        },
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });
    const navigate = useNavigate();
    function handleFormsubmit(values) {
        setValidateOnChange(true);
        setLoading(true);
        fetch('http://localhost:5000/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setLoading(false);
                    showSuccessNoti();
                    bacsicForm.resetForm();
                } else {
                    setLoading(false);
                    showErorrNoti();
                }
            })
            .catch(() => {
                setLoading(false);
                showErorrNoti();
            });
    }

    return (
        <>
            <div className="container">
                <div className="w-full">
                    <form
                        onSubmit={(e) => {
                            setValidateOnChange(true);
                            bacsicForm.handleSubmit(e);
                        }}
                    >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                            {/* NAME AND TYPE */}
                            <div className="space-y-1">
                                {/* NAME */}
                                <div>
                                    <label className="label" htmlFor="name">
                                        Tên sản phẩm *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={clsx('text-input', {
                                            invalid: bacsicForm.errors.name,
                                        })}
                                        onChange={bacsicForm.handleChange}
                                        value={bacsicForm.values.name}
                                        name="name"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.errors.name,
                                        })}
                                    >
                                        {bacsicForm.errors.name || 'No message'}
                                    </span>
                                </div>

                                {/* TYPE */}
                                <div>
                                    <label className="label" htmlFor="type">
                                        Loại sản phẩm *
                                    </label>
                                    <ProductTypeInput
                                        id="type"
                                        className={clsx('text-input cursor-pointer', {
                                            invalid: bacsicForm.errors.type,
                                        })}
                                        onChange={bacsicForm.handleChange}
                                        value={bacsicForm.values.type}
                                        name="type"
                                    />

                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.errors.type,
                                        })}
                                    >
                                        {bacsicForm.errors.type || 'No message'}
                                    </span>
                                </div>
                            </div>

                            {/* IMAGE */}
                            <div className="mb-2">
                                <label className="label">Chọn ảnh</label>
                                <ImagesInput onChange={(images) => console.log(images)} />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="label" htmlFor="description">
                                    Mô tả sản phẩm *
                                </label>
                                <textarea
                                    type="text"
                                    id="description"
                                    className={clsx('text-input !h-auto py-2', {
                                        invalid: bacsicForm.errors.description,
                                    })}
                                    onChange={bacsicForm.handleChange}
                                    value={bacsicForm.values.description}
                                    name="description"
                                    rows={4}
                                ></textarea>
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.errors.description,
                                    })}
                                >
                                    {bacsicForm.errors.description || 'No message'}
                                </span>
                            </div>

                            {/* IMPORT PRICE, PRICE AND SIZE */}
                            <div>
                                <div className="mb-1 flex space-x-8">
                                    {/* IMPORT PRICE */}
                                    <div className="flex-1">
                                        <label className="label" htmlFor="importPrice">
                                            Giá nhập *
                                        </label>
                                        <PriceInput
                                            id="importPrice"
                                            onChange={bacsicForm.handleChange}
                                            value={bacsicForm.values.importPrice}
                                            error={bacsicForm.errors.importPrice}
                                            name="importPrice"
                                            placeholder="Giá nhập"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': bacsicForm.errors.importPrice,
                                            })}
                                        >
                                            {bacsicForm.errors.importPrice || 'No message'}
                                        </span>
                                    </div>
                                    {/* PRICE */}
                                    <div className="flex-1">
                                        <label className="label" htmlFor="price">
                                            Giá bán *
                                        </label>
                                        <PriceInput
                                            id="price"
                                            onChange={bacsicForm.handleChange}
                                            value={bacsicForm.values.price}
                                            error={bacsicForm.errors.price}
                                            name="price"
                                            placeholder="Giá bán"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': bacsicForm.errors.price,
                                            })}
                                        >
                                            {bacsicForm.errors.price || 'No message'}
                                        </span>
                                    </div>
                                </div>
                                {/* SIZE */}
                                <div className="">
                                    <label className="label !cursor-default">Size giày</label>
                                    <SizesInput
                                        disabledSizes={[30, 31, 50]}
                                        selectedSizes={bacsicForm.values.sizes}
                                        onSelectedSizeChange={(s) => {
                                            bacsicForm.setFieldValue('sizes', s).then(() => {
                                                validateOnChange &&
                                                    bacsicForm.validateField('sizes');
                                            });
                                        }}
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.errors.sizes,
                                        })}
                                    >
                                        {bacsicForm.errors.sizes || 'No message'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end border-t pt-6">
                            <div className="flex">
                                <Link to={'/product'} className="btn btn-red btn-md">
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                    <span>Hủy</span>
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-blue btn-md"
                                    disabled={loading}
                                >
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </span>
                                    <span>Thêm</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
