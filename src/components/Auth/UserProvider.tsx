'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import {PrivateUser} from "@/types/PrivateUser";

type UserContextType = {
    user: PrivateUser | null;
};



interface Props {
    children: React.ReactNode,
    PrivateUser: PrivateUser,
}

const Context = createContext<UserContextType>({ user: null });

const Provider = ({ children, PrivateUser }: Props) => {
    const [user, setUser] = useState<PrivateUser>(PrivateUser);
    const router = useRouter();


    const exposed: UserContextType = {
        user,
    };

    return (
        <Context.Provider value={exposed}>{children}</Context.Provider>
    );
};

export const useUser = () => useContext(Context).user;
export default Provider;
