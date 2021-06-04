import { data } from "autoprefixer";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { authUserState } from "../../store/auth";

function UserProfile({ user }) {
    console.log(user);
    const authUser = useRecoilValueLoadable(authUserState);
    return (
        <Layout middleware="auth" title={user.name}>
            <Container>
                <div className="w-1/2 mx-auto flex items-center">
                    <div className="flex-shrink-0 inline-block">
                        <img src={user.picture} alt="image" className="w-17 h-17 rounded-full" />
                    </div>
                    <div className="inline-block ml-4">
                        <div className="font-medium mb-1">
                            {user.name} (@{user.username})
                        </div>
                        <div className="text-sm text-gray-600">Joined at {user.joined}</div>
                    </div>
                    {authUser.contents && authUser.contents.id === user.id && authUser.state === "hasValue" && (
                        <Link href="/settings/profile">
                            <a className="py-2 px-6 rounded bg-blue-500 text-white ml-20">Edit Profile</a>
                        </Link>
                    )}
                </div>
            </Container>
        </Layout>
    );
}

export default UserProfile;

export async function getServerSideProps({ params }) {
    let { data } = await axios.get(`/api/profile/${params.username}`);
    return {
        props: {
            user: data.data,
        },
    };
}
