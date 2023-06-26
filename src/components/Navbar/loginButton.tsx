'use client';
import styles from './nav.module.css'
import Image from 'next/image';
import * as config from '@/config/config';
import { useUser } from '@/components/Auth/UserProvider'


export default function AuthButton() {
  const user = useUser();


  return (
    <div>
      {
        user.user === null ? <a className={`${styles.selectedIcon} ${styles.AuthorButton}`} href={config.authUrl} draggable="false">
          <AuthIcon />
          Авторизація
        </a> :
          <div className={styles.avatarWrapper}>
            <Image
              priority
              src={`https://cdn.discordapp.com/avatars/${user.user.discordUser.discordId}/${user.user.discordUser.avatarUrl}`}
              width="300"
              height="300"
              className={styles.Avatar}
              alt=""
              onClick={user.logout}
              draggable="false"
            />
          </div>
      }
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

/*
function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? decodeURIComponent(cookieValue.pop()!) : null;
}*/