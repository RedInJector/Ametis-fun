import s from './page.module.css';
import RegistrationPanel from './RegistrationPanel';
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from '@/components/Navbar/nav'



export default function LoginPage() {
    return (
        <UserProvider AuthorizedOnly={true}>
        <NavBar />
        <main className={s.main}>
            <RegistrationPanel />
        </main>
        </UserProvider>
    )
}
