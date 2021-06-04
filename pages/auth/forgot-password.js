import axios from "axios";
import React, { useState } from "react";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { useToasts } from "react-toast-notifications";

function forgotpassword(props) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const { addToast } = useToasts();

    const submitHandler = async () => {
        setLoading(true);
        try {
            let response = await axios.post("/forgot-password", { email });
            addToast(response.data.message, {
                appearance: "success",
                autoDismiss: true,
            });
            setErrors([]);
            setEmail("");
        } catch (error) {
            setErrors(error.response.data.errors);
        }
        setLoading(false);
    };

    return (
        <Layout middleware="guest" title="Forgot Password">
            <div className="w-1/2 mx-auto">
                <Card header="Forgot Password">
                    <div className="mt-3">
                        <Label htmlFor="email">Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" />
                        {errors.email && <Error>{errors.email[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <button onClick={submitHandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            {loading ? "Loading . . ." : "Send Email"}
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default forgotpassword;
