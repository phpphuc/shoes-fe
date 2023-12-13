import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../components/ModalProvider';

export default function useModal({ modal, meta }) {
    const { modalState, setModalState } = useContext(ModalContext);
    const modalIdRef = useRef(0);

    function open(extraMeta = {}) {
        setModalState((prev) => ({
            id: prev.id,
            modals: [
                ...prev.modals,
                {
                    id: modalIdRef.current,
                    open: false,
                    element: modal({
                        open,
                        close,
                        meta: {
                            ...meta,
                            ...extraMeta,
                        },
                    }),
                },
            ],
        }));
    }

    function close() {
        setModalState((prev) => ({
            id: prev.id,
            modals: prev.modals.filter((m) => m.id !== modalIdRef.current),
        }));
    }

    useEffect(() => {
        modalIdRef.current = modalState.id + 1;
        setModalState((prev) => ({
            ...prev,
            id: modalIdRef.current + 1,
        }));
    }, []);

    return [open, close];
}
