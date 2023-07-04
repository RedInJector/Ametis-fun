'use client'
import UserProvider from '@/components/Auth/UserProvider';
import Table from './Table';

export default async function Page() {

    return(
        <UserProvider AuthorizedOnly={true}>
            <Table />
        </UserProvider>
    )

}

