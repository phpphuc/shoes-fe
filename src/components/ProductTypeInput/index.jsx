import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

function ProductTypeInput({ ...props }) {
    const [productTypes, setProductTypes] = useState([]);
    const selectElem = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <select {...props} ref={selectElem}>
            <option className='dark:bg-gray-600 dark:text-slate-400' value="" disabled>
                -- Chọn loại sản phẩm --
            </option>
            {productTypes.map((productType) => (
                <option className='dark:bg-gray-600' key={productType._id} value={productType._id}>
                    {productType.name}
                </option>
            ))}
        </select>
    );
}
export default ProductTypeInput;
