import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { authUserState } from "../../store/auth";
import { useToasts } from "react-toast-notifications";

function profile(props) {
    const authUser = useRecoilValueLoadable(authUserState);
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "" });
    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const updateProfileHandler = async () => {
        setLoading(true);
        try {
            await axios.put("user/profile-information", credentials);
            addToast("The profile has been updated!", {
                appearance: "success",
                autoDismiss: true,
            });
            if (credentials.email !== authUser.contents.email) {
                route.replace("/settings/verify-email");
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
        setLoading(false);
    };

    // useEffect(() => {
    //     setCredentials((prev) => ({ ...prev, name: authUser.contents.name, email: authUser.contents.email, username: authUser.contents.username }));
    //     if (authUser.state === "hasValue" && authUser.contents && authUser.contents.is_verified === false) {
    //         //terkadang === false ini penting di beberapa kasus karena ika pake ! ini kadang kalo valuenya null dia jadi
    //         //lolos seperti contoh diatas !authUser.contents.is_verified bakal lolos karena nilainya diawal null/undefine
    //         //kita juga bisa dulukan cek yang hasValue di eksekusi pertama
    //         route.push("/settings/verify-email");
    //     }
    // }, [authUser.contents]);

    useEffect(() => {
        setCredentials((prev) => ({
            ...prev,
            username: authUser.contents.username,
            name: authUser.contents.name,
            email: authUser.contents.email,
        }));
        if (authUser.state === "hasValue" && authUser.contents && !authUser.contents.has_verified) {
            router.replace("/settings/verify-email");
        }
    }, [authUser.contents]);

    return (
        <Layout title="Edit Profile">
            <div className="w-1/2 mx-auto">
                <Card header="Login">
                    <div className="mt-3">
                        <Label htmlFor="name">Name</Label>
                        <Input value={credentials.name || ""} onChange={(e) => setCredentials((prev) => ({ ...prev, name: e.target.value }))} type="text" name="name" />
                        {errors.name && <Error>{errors.name[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="username">Username</Label>
                        <Input value={credentials.username || ""} onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))} type="text" name="username" />
                        {errors.username && <Error>{errors.username[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="email">Email</Label>
                        <Input value={credentials.email || ""} onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))} type="text" name="email" />
                        {errors.email && <Error>{errors.email[0]}</Error>}
                    </div>

                    <div className="mt-3">
                        <button onClick={updateProfileHandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            {loading ? "Loading . . ." : "Update"}
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default profile;
