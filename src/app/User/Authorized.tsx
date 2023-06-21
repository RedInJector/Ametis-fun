'use client'
import { useState, useEffect, ReactNode } from 'react';
import * as config from "../config";
import { User } from './User';

interface AuthorizedProps {
  children: (data: any) => ReactNode;
}


const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUrl}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      if (!response.ok) {
        window.location.replace(config.authUrl);
      }

      const data = await response.json() as User;

      setUser(data);
    };

    fetchData();
  }, []);

  return <>{children(user)}</>;
}


export default Authorized;