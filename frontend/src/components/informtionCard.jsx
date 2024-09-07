import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ title, message, type, duration }) => {
    const closeButton = ({ closeToast }) => (
        <button onClick={closeToast} style={{
            color: 'white',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'start',
            cursor: 'pointer',
            fontSize: '18px'
        }}>
            ✕
        </button>
    );

    const toastStyle = {
        position: "top-right",
        autoClose: duration * 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: closeButton,
        style: {
            backgroundColor: type === 'error' ? '#d32f2f' : '#1976d2',
            color: 'white',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',

        }
    };

    const showToast = () => {
        toast(<div>
            <h3 style={{marginTop: 0}}><b>{title}</b></h3>
            <p>{message}</p>
        </div>, toastStyle);
    };

    return { showToast };
};

export const notify = ({ title, message, type, duration }) => {
    const { showToast } = CustomToast({ title, message, type, duration });
    showToast();
};

export const ToastManager = () => (
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);