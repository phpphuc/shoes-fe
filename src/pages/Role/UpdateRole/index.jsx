import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import LoadingForm from '../../../components/LoadingForm';

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
});

function FunctionGroup({ func, selectedFunctionIds, setSelectedFunctionIds }) {
    function handleToggleSubFunction(subFuncId) {
        const idString = func.id + '/' + subFuncId;
        const index = selectedFunctionIds.findIndex((id) => id === idString);
        if (index === -1) {
            setSelectedFunctionIds([...selectedFunctionIds, idString]);
        } else {
            setSelectedFunctionIds(selectedFunctionIds.filter((id) => id !== idString));
        }
    }

    function isCheck(subFuncId) {
        const idString = func.id + '/' + subFuncId;
        if (selectedFunctionIds.find((id) => id === idString)) {
            return true;
        }
        return false;
    }

    function isCheckAll() {
        const funcIds = selectedFunctionIds.filter((id) => id.split('/')[0] === func.id);
        return funcIds.length === func.subFunctions.length;
    }

    function handleToggleCheckAll() {
        if (isCheckAll()) {
            setSelectedFunctionIds(
                selectedFunctionIds.filter((id) => id.split('/')[0] !== func.id)
            );
        } else {
            setSelectedFunctionIds([
                ...selectedFunctionIds,
                ...func.subFunctions
                    .filter(
                        (subFunc) =>
                            !selectedFunctionIds.find((id) => id === func.id + '/' + subFunc.id)
                    )
                    .map((subFunc) => func.id + '/' + subFunc.id),
            ]);
        }
    }

    return (
        <div className="flex flex-col border-b py-2">
            <div className="inline-flex items-center" onClick={handleToggleCheckAll}>
                <input
                    className="!h-4 !w-4 accent-blue-600"
                    type="checkbox"
                    readOnly
                    checked={isCheckAll()}
                />
                <label className="cursor-pointer pl-2 font-semibold text-gray-700 dark:text-slate-200">
                    {func.name}
                </label>
            </div>
            <div className="mt-3 flex items-center space-x-6 pl-6">
                {func.subFunctions.map((subFunc) => (
                    <div
                        key={subFunc.id}
                        className="flex items-center"
                        onClick={() => handleToggleSubFunction(subFunc.id)}
                    >
                        <input
                            className="!h-4 !w-4 accent-blue-600"
                            type="checkbox"
                            readOnly
                            checked={isCheck(subFunc.id)}
                        />
                        <label className="cursor-pointer pl-2 text-gray-600 dark:text-slate-200">{subFunc.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function UpdateRole() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const showSuccessNoti = () => toast.success('Cập nhật chức vụ thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const [role, setRole] = useState({});

    const [functions, setFunctions] = useState([]);
    const [selectedFunctionIds, setSelectedFunctionIds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/function')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setFunctions(resJson.functions);
                } else {
                    setFunctions([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        fetch('http://localhost:5000/api/role' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setRole(resJson.role);
                    setSelectedFunctionIds(resJson.role?.functions);
                } else {
                    setRole({});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const form = useFormik({
        initialValues: {
            name: role?.name || '',
            description: role?.description || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: updateRole,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });

    function updateRole(values) {
        setLoading(true);
        fetch('http://localhost:5000/api/role/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, functions: selectedFunctionIds }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    showSuccessNoti();
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
        <div className="container">
            <div className="mb-3 mt-2 flex items-center justify-center space-x-3 rounded bg-blue-50 py-4 dark:bg-white/5">
                <span className="text-lg font-medium text-gray-700 dark:text-slate-200">Mã chức vụ:</span>
                <span className="text-lg font-bold text-blue-600">{role.id}</span>
            </div>
            <form
                className="mx-auto max-w-[800px]"
                onSubmit={(e) => {
                    setValidateOnChange(true);
                    form.handleSubmit(e);
                }}
            >
                <div className="relative">
                    <div className="mt-5 flex items-center space-x-4">
                        <div className="flex flex-1 flex-col">
                            <label className="label dark:text-slate-200" htmlFor="name">
                                Tên chức vụ *
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
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.name,
                                })}
                            >
                                {form.errors.name || 'No message'}
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <label className="label dark:text-slate-200" htmlFor="description">
                                Mô tả chức vụ
                            </label>
                            <input
                                type="text"
                                id="description"
                                className={clsx('text-input w-full py-[5px] dark:bg-white/5 dark:text-slate-200', {
                                    invalid: form.errors.description,
                                })}
                                onChange={form.handleChange}
                                value={form.values.description}
                                name="description"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.description,
                                })}
                            >
                                {form.errors.description || 'No message'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 font-semibold text-gray-600 dark:text-slate-200">Chọn chức năng</p>
                        <div className="!h-[360px] w-full overflow-y-scroll rounded border border-gray-300 px-5 py-5">
                            {functions.map((func) => (
                                <FunctionGroup
                                    key={func?.id}
                                    func={func}
                                    selectedFunctionIds={selectedFunctionIds}
                                    setSelectedFunctionIds={setSelectedFunctionIds}
                                />
                            ))}
                        </div>
                    </div>

                    <LoadingForm loading={loading} />
                </div>

                <div className="mt-5 flex items-center justify-end">
                    <div className="flex">
                        <Link to={'/role'} className="btn btn-red btn-md">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span className="">Hủy</span>
                        </Link>

                        <button type="submit" className="btn btn-blue btn-md" disabled={loading}>
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span className="">Cập nhật</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateRole;
