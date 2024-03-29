import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import { Scrollbars } from 'react-custom-scrollbars';

export default function Table({
    table,
    notFoundMessage = 'Không có dữ liệu',
    rowClickable = true,
}) {
    return (
        // min - w - [1000px] inline - block  max-h-[350px]
            <div className=" overflow-auto border rounded-md">
        <table className="data-table min-w-full">
            <thead className="thead whitespace-nowrap">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr className="tr" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                className="th"
                                style={{
                                    maxWidth: Number.isNaN(header.getSize())
                                        ? null
                                        : header.getSize(),
                                }}
                                key={header.id}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="tbody whitespace-nowrap">
                {/* <Scrollbars
                    autoHide
                    autoHideTimeout={4000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMax={350}
                > */}
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td colSpan={table.getHeaderGroups()[0].headers.length}>
                                <div className="flex flex-col items-center justify-center py-6">
                                    <div className="text-orange-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1}
                                            stroke="currentColor"
                                            className="h-12 w-12"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-700 dark:text-slate-200">{notFoundMessage}</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                className={clsx('tr', {
                                    '!cursor-default': !rowClickable,
                                })}
                                key={row.id}
                                onClick={() =>
                                    table.options.meta?.onRowClick &&
                                    table.options.meta?.onRowClick(row)
                                }
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        className="td"
                                        style={{
                                            maxWidth: Number.isNaN(cell.column.getSize())
                                                ? null
                                                : cell.column.getSize(),
                                        }}
                                        key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                    
                                ))}
                            </tr>
                        ))
                    )}
                {/* </Scrollbars> */}
            </tbody>
            </table>
        </div>
    );
}
