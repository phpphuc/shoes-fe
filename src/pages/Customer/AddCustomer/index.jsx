import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import TimeNow from '../../../components/TimeNow';
import 'react-toastify/dist/ReactToastify.css';
import LoadingForm from '../../../components/LoadingForm';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Trường này bắt buộc')
        .min(2, 'Tên phải có độ dài hơn 2 kí tự')
        .max(30, 'Tên dài tối đa 30 kí tự'),
    address: Yup.string().required('Trường này bắt buộc'),
    phone: Yup.string()
        .required('Trường này bắt buộc')
        .matches(/^[\+|0]([0-9]{9,14})\b/, 'Số điện thoại không hợp lệ'),
    password: Yup.string().required('Trường này bắt buộc'),
});

function AddCustomer() {
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [image, setImage] = useState(null);

    const showSuccessNoti = () => toast.success('Thêm khách hàng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const form = useFormik({
        initialValues: {
            name: '',
            phone: '',
            password: '',
            address: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });

    async function handleFormsubmit(values) {
        setLoading(true);
        try {
            let imageUrl = null;
            if (image) {
                let formdata = new FormData();
                formdata.append('image', image.file);
                const res = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formdata,
                });

                const data = await res.json();
                imageUrl = data.image.url;
            }

            const res = await fetch('http://localhost:5000/api/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, avatar: imageUrl }),
            });
            const resJson = await res.json();
            if (resJson.success) {
                showSuccessNoti();
                form.resetForm();
                setValidateOnChange(false);
                setImage(null);
            } else if (resJson.message === 'phone already exists') {
                toast.error('Số điện thoại đã tồn tại');
            } else {
                showErorrNoti();
            }
        } catch {
            showErorrNoti();
        } finally {
            setLoading(false);
        }
    }

    function onImageInputChange(e) {
        const url = URL.createObjectURL(e.target.files[0]);
        setImage({ file: e.target.files[0], url });
        e.target.value = null;
    }

    return (
        <div className="container">
            <form
                onSubmit={(e) => {
                    setValidateOnChange(true);
                    form.handleSubmit(e);
                }}
                className="mx-auto mt-5 max-w-[700px] rounded-xl border border-slate-300 p-5"
            >
                <div className="relative flex pt-10">
                    <div className="relative h-[150px] w-[150px] rounded-full border">
                        <img
                            className="absolute inset-0 block h-full w-full rounded-full object-cover"
                            src={image?.url || '/placeholder.png'}
                        />
                        <label
                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full"
                            htmlFor="image-input"
                        ></label>
                        <input
                            id="image-input"
                            type="file"
                            className="hidden"
                            onChange={onImageInputChange}
                        />
                        {image && (
                            <button
                                className="absolute top-1 right-1 rounded-full border bg-white px-2 py-2 text-red-600 hover:text-red-400"
                                onClick={() => setImage(null)}
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="ml-8 flex-1">
                        <div className="flex flex-col">
                            <label className="label dark:text-slate-200" htmlFor="phone">
                                Số điện thoại *
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className={clsx('text-input w-full py-[5px] dark:bg-white/5 dark:text-slate-200', {
                                    invalid: form.errors.phone,
                                })}
                                onChange={form.handleChange}
                                value={form.values.phone}
                                name="phone"
                                placeholder="0123456789"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.phone,
                                })}
                            >
                                {form.errors.phone || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label className="label dark:text-slate-200" htmlFor="password">
                                Mật khẩu *
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={clsx('text-input w-full py-[5px] dark:bg-white/5 dark:text-slate-200', {
                                    invalid: form.errors.password,
                                })}
                                onChange={form.handleChange}
                                value={form.values.password}
                                name="password"
                                placeholder="********"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.password,
                                })}
                            >
                                {form.errors.password || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label className="label dark:text-slate-200" htmlFor="name">
                                Tên khách hàng *
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={clsx('text-input w-full py-[5px] dark:bg-white/5 dark:text-slate-200', {
                                    invalid: form.errors.name,
                                })}
                                onChange={form.handleChange}
                                value={form.values.name}
                                name="name"
                                placeholder="Nguyễn Văn A"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.name,
                                })}
                            >
                                {form.errors.name || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label className="label dark:text-slate-200" htmlFor="address">
                                Địa chỉ *
                            </label>
                            <textarea
                                id="address"
                                className={clsx('text-input !h-auto py-2 dark:bg-white/5 dark:text-slate-200', {
                                    invalid: form.errors.address,
                                })}
                                onChange={form.handleChange}
                                value={form.values.address}
                                name="address"
                                rows={3}
                            ></textarea>
                            <span
                                className={clsx('block text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.address,
                                })}
                            >
                                {form.errors.address || 'No message'}
                            </span>
                        </div>
                    </div>
                    <LoadingForm loading={loading} />
                </div>

                <div className="mt-6 flex items-center justify-end border-t pt-6">
                    <Link to={'/customer'} className="btn btn-red btn-md">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Hủy</span>
                    </Link>
                    <button type="submit" className="btn btn-blue btn-md" disabled={loading}>
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm khách hàng</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCustomer;
