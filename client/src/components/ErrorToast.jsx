import { useEffect, useState } from "react";

export default function ErrorToast({ error, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!error) return;

        const showTimer = setTimeout(() => setVisible(true), 0);
        const hideTimer = setTimeout(() => {
            setVisible(false); 
            setTimeout(onClose, 1000); 
        }, 4000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [error, onClose]);

    if (!error) return null;

    return (
        <div
        className={`
        fixed top-4 right-4 z-50 alert alert-error shadow-lg 
        transition-opacity duration-800
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
        >
            <span>{error}</span>
        </div>
    );
}
