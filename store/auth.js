import axios from "axios";
import { atom, selector } from "recoil";

export const authCheckState = atom({
    key: "authCheckState",
    default: false,
});
export const authUserState = selector({
    key: "authUserState",
    get: async ({ get }) => {
        get(authCheckState);
        try {
            let response = await axios.get("/api/me");
            return response.data.data;
        } catch (error) {}
    },
});
