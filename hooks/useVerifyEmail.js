import axios from "axios";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

function useVerifyEmail(props) {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const resendEmailVerification = async () => {
        setLoading(true);
        try {
            await axios.post("/email/verification-notification");
            addToast("The email has been sent", {
                appearance: "success",
                autoDismiss: true,
            });
        } catch (error) {
            addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
            });
        }
        setLoading(false);
    };
    return {
        resendEmailVerification,
        loading,
    };
}

export default useVerifyEmail;
