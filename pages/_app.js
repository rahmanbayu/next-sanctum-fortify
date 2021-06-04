import axios from "axios";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import { ToastProvider } from "react-toast-notifications";

axios.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.baseURL = "http://localhost:8000";
    return config;
});

function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <ToastProvider>
                <Component {...pageProps} />
            </ToastProvider>
        </RecoilRoot>
    );
}

export default MyApp;
