'use client';
import styles from './nav.module.css'
import Image from 'next/image';
import { logOut } from './User/User';
import * as config from './config';


import { User } from './User/User';

import { useState, useEffect } from 'react';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array to only run the effect once on initial mount

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    if (user === null) {
      return;
    }
    let cook = getCookie("_dt");
    if(cook == null)
      return

    logOut(cook)
    //logOut(getCookie("_dt"));
    setUser(null);
  };

  return (
    <div>
      {user === null ? (
        <a className={`${styles.selectedIcon} ${styles.AuthorButton}`} href={config.authUrl} draggable="false">
          <AuthIcon />
          Авторизація
        </a>
      ) : (
        <div className={styles.avatarWrapper}>
          <Image
            priority
            src={`https://cdn.discordapp.com/avatars/${user.discordUser.discordId}/${user.discordUser.avatarUrl}`}
            width="300"
            height="300"
            className={styles.Avatar}
            alt=""
            onClick={handleLogout}
            draggable="false"
          />
        </div>
      )}
    </div>
  );
}

function AuthIcon() {
  return (
    <Image
      draggable="false"
      priority
      src="/Sign-out.svg"
      width={24}
      height={24}
      className={`${styles.authorzIcon}`}
      alt="Join our Discord!"
    />
  );
}


function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? decodeURIComponent(cookieValue.pop()!) : null;
}