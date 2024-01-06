import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountActions } from '../../redux/slices/accountSlide';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { themeSelector } from '../../redux/selectors';
import { themeActions } from '../../redux/slices/themeSlice';

const validationSchema = Yup.object({
    username: Yup.string().required('Vui lòng nhập tên tài tài khoản!'),
    password: Yup.string().required('Vui lòng nhập nhập mật khẩu!'),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const showSuccessNoti = () => toast.success('Đăng nhập thành công!');
    const showErorrNoti = () => toast.error('Đăng nhập không thành công!');
    const theme = useSelector(themeSelector);

    const form = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });
    function handleFormsubmit(values) {
        setLoading(true);
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {git remote set-url origin 
                    console.log(resJson.account);
                    showSuccessNoti();
                    dispatch(accountActions.login(resJson.account));
                    navigate('/');
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0">
                    <div className=" md:w-[448px] rounded-lg bg-white shadow dark:bg-gray-900 dark:border">
                        <div className="relative space-y-4 p-8">
                            <h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-slate-100">
                                Đăng nhập
                            </h1>
                            <form
                                onSubmit={(e) => {
                                    setValidateOnChange(true);
                                    form.handleSubmit(e);
                                }}
                            >
                                <div className="mb-2">
                                    <label
                                        htmlFor="username"
                                        className="mb-1 block font-medium text-gray-900 dark:text-slate-200"
                                    >
                                        Tài khoản
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className={clsx('text-input w-full py-2 dark:bg-white/5 dark:text-slate-200', {
                                            invalid: form.errors.username,
                                        })}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.username}
                                        placeholder="Tên tài khoản"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': form.errors.username,
                                        })}
                                    >
                                        {form.errors.username || 'No message'}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="password"
                                        className="mb-1 block font-medium text-gray-900 dark:text-slate-200"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.password}
                                        placeholder="Mật khẩu của bạn"
                                        className={clsx('text-input w-full py-2 dark:bg-white/5 dark:text-slate-200', {
                                            invalid: form.errors.password,
                                        })}
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': form.errors.password,
                                        })}
                                    >
                                        {form.errors.password || 'No message'}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blue btn-md mt-4 w-full"
                                    disabled={loading}
                                >
                                    {!loading ? (
                                        <span>Đăng nhập</span>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 animate-spin"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                />
                                            </svg>
                                            <span className="ml-1">Đang đăng nhập</span>
                                        </div>
                                    )}
                                </button>
                            </form>
                            <button className="absolute top-1 right-3"
                                onClick={() => {
                                    console.log(theme.darkMode);
                                    dispatch(themeActions.toggleTheme());
                                }}>
                                <span className="sr-only">{theme.darkMode ? 'Enable light mode' : 'Enable dark mode'}</span>
                                {theme.darkMode ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 text-slate-500 fill-current hover:text-slate-400">
                                        <path d="M320 256C320 309 277 352 224 352C170.1 352 128 309 128 256C128 202.1 170.1 160 224 160C277 160 320 202.1 320 256z"></path>
                                        <path className="opacity-40" d="M192 80C192 62.33 206.3 48 224 48C241.7 48 256 62.33 256 80C256 97.67 241.7 112 224 112C206.3 112 192 97.67 192 80zM192 432C192 414.3 206.3 400 224 400C241.7 400 256 414.3 256 432C256 449.7 241.7 464 224 464C206.3 464 192 449.7 192 432zM400 288C382.3 288 368 273.7 368 256C368 238.3 382.3 224 400 224C417.7 224 432 238.3 432 256C432 273.7 417.7 288 400 288zM48 224C65.67 224 80 238.3 80 256C80 273.7 65.67 288 48 288C30.33 288 16 273.7 16 256C16 238.3 30.33 224 48 224zM128 128C128 145.7 113.7 160 96 160C78.33 160 64 145.7 64 128C64 110.3 78.33 96 96 96C113.7 96 128 110.3 128 128zM352 416C334.3 416 320 401.7 320 384C320 366.3 334.3 352 352 352C369.7 352 384 366.3 384 384C384 401.7 369.7 416 352 416zM384 128C384 145.7 369.7 160 352 160C334.3 160 320 145.7 320 128C320 110.3 334.3 96 352 96C369.7 96 384 110.3 384 128zM96 352C113.7 352 128 366.3 128 384C128 401.7 113.7 416 96 416C78.33 416 64 401.7 64 384C64 366.3 78.33 352 96 352z"></path>
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6 text-slate-500 fill-current hover:text-slate-600" >
                                        <path d="M180.7 120.5C81 120.5 .2 201.5 .2 301.4S81 482.2 180.7 482.2c48.9 0 93.3-19.5 125.8-51.2c4.7-4.6 5.9-11.8 2.9-17.6s-9.5-9.1-16-8c-7.7 1.3-15.6 2-23.6 2c-76 0-137.6-61.8-137.6-138c0-51.6 28.2-96.5 70-120.2c5.7-3.3 8.7-9.9 7.3-16.3s-6.9-11.2-13.4-11.8c-5-.4-10.2-.6-15.3-.6z"></path>
                                        <path className="opacity-40" d="M268.3 93.4l10.4 36.4c1 3.4 4.1 5.8 7.7 5.8s6.7-2.4 7.7-5.8l10.4-36.4L340.8 83c3.4-1 5.8-4.1 5.8-7.7s-2.4-6.7-5.8-7.7L304.4 57.2 294 20.9c-1-3.4-4.1-5.8-7.7-5.8s-6.7 2.4-7.7 5.8L268.3 57.2 231.9 67.6c-3.4 1-5.8 4.1-5.8 7.7s2.4 6.7 5.8 7.7l36.4 10.4zm96.4 144.6l15.6 54.6c1.5 5.1 6.2 8.7 11.5 8.7s10-3.5 11.5-8.7l15.6-54.6 54.6-15.6c5.1-1.5 8.7-6.2 8.7-11.5s-3.5-10-8.7-11.5l-54.6-15.6-15.6-54.6c-1.5-5.1-6.2-8.7-11.5-8.7s-10 3.5-11.5 8.7l-15.6 54.6-54.6 15.6c-5.1 1.5-8.7 6.2-8.7 11.5s3.5 10 8.7 11.5l54.6 15.6z"></path>
                                    </svg> 
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
