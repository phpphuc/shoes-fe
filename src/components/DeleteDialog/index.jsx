import { useState } from 'react';
import clsx from 'clsx';

export default function DeleteDialog({ open, close, meta }) {
    return (
        <div
            className={clsx(
                'fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 opacity-100 transition-opacity'
            )}
        >
            <div className="">
                <div className="min-w-[160px] max-w-[400px] rounded-lg bg-white p-6">
                    <div className="text-clr-text-dark font-bold">
                        Bạn có chắc chắn muốn xoá không?
                    </div>
                    <p className="mt-4">Lưu ý: Bạn không thể không phục lại sau khi xoá!</p>
                    <div className="mt-4 flex">
                        <button
                            className="btn btn-blue btn-md"
                            onClick={() => {
                                close();
                            }}
                        >
                            Quay lại
                        </button>
                        <button
                            className="btn btn-md btn-red"
                            onClick={() => {
                                meta?.onDelete(meta?.deleteId);
                            }}
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
