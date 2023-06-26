'use client'
import { useState, useEffect, ReactNode } from 'react';
import * as config from "../config/config";
import { User } from '../types/User';

interface AuthorizedProps {
  children: (data: any) => ReactNode;
}
interface AuthorizedProps2 {
  children: (user: User | null, handleLogout: () => void) => ReactNode;
}


const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
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

  return <>{user ?  children(user) : <p>Loading...</p>}</>;
}
export default Authorized;

export const AuthorizedNullable: React.FC<AuthorizedProps2> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    let cook = getCookie("_dt");
    if(cook == null)
      return
  
    logOut(cook)
    setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json() as User;

      setUser(data);
    };

    fetchData();
  }, []);

  return <>{children(user, handleLogout)}</>;
}

export const AuthorizedUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json() as User;

      setUser(data);
    };

    fetchData();
  }, []);

  return user;
}



function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? decodeURIComponent(cookieValue.pop()!) : null;
}

function logOut(token: string) {
  try {
      fetch(`${config.apiUri}/api/v1/logout2`, {
          method: 'DELETE',
          cache: 'no-store',
          credentials: 'include',
      }).then(
          (res) => {
              if (!res.ok) {
                  console.error('An unknown error occurred ');
              }
          }
      );
  }
  catch (error) {
      console.error('An error occurred ' + error);
  }
}






