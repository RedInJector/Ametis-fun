import s from './Registrationpanel.module.css';
import RegistrationPanel from './RegistrationPanel';
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from '@/components/navbar2/_nav'
import Footer from '@/components/footer/footer'

export default function LoginPage() {
    return (
        <>
        <UserProvider AuthorizedOnly={true}>
            <NavBar />
            <main className={s.main}>
                <RegistrationPanel />
            </main>
        </UserProvider>
        <Footer />
        </>
    )
}
