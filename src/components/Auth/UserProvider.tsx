'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/types';
import * as config from "@/config/config";
import {useRouter} from "next/navigation";

type UserContextType = {
    user: User | null;
    logout: () => void;
};



interface Props {
    children: React.ReactNode,
    AuthorizedOnly: boolean
}

const Context = createContext<UserContextType>({ user: null, logout: () => { } });

const Provider = ({ children, AuthorizedOnly }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
                method: 'GET',
                cache: 'no-store',
                credentials: 'include',
            });
            if (!response.ok) {
                if(AuthorizedOnly)
                    window.location.replace(config.authUrl);

                setUser(null);
                return;
            }
            if(!response.ok)
                return;

            const data = await response.json() as User;

            setUser(data);
        };

        fetchData();
    }, [])

    const logout = () => {
        try {
            fetch(`${config.apiUri}/api/v2/logout`, {
                method: 'DELETE',
                cache: 'no-store',
                credentials: 'include',
            }).then(
                (res) => {
                    if (!res.ok) {
                        console.error('An unknown error occurred ');
                    }
                    setUser(null);
                    router.refresh();
                    if(AuthorizedOnly)
                        window.location.replace("/");
                }
            );
        }
        catch (error) {
            console.error('An error occurred ' + error);
        }

    }

    const exposed: UserContextType = {
        user,
        logout,
    };

    return (
        <Context.Provider value={exposed}>{children}</Context.Provider>
    );
};

export const useUser = () => useContext(Context).user;
export const useAuth = () => useContext(Context);

export default Provider;

/*
interface Props2 {
    children: React.ReactNode,
}
const a =({ children }:Props2) =>{
    return(
        {children}
    )
}
*/