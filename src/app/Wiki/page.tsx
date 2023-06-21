'use client'
import Authorized from "../User/Authorized";
import { User } from "../User/User";


export default async function Page() {
    return (
    <main>
      <Authorized>
        {(user: User | null) => (
          <div>
          <h1>Welcome to the HomePage</h1>
          {user ? <Confidential user={user} /> : <p>Loading...</p>}
          {/* Render other components that can access the fetched data */}
        </div>
        )}
      </Authorized>
    </main>
    )
}

const Confidential = ({user}:{user:User}) =>{
    return(
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet vel nesciunt illo cum dignissimos voluptate cumque ipsum alias esse totam perferendis, perspiciatis ipsam, sequi temporibus similique qui odio blanditiis incidunt.
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio numquam quis officia culpa qui esse accusantium nisi tenetur impedit facilis soluta voluptate, dolore aliquam vitae recusandae totam tempora maiores. Aut?
            </div>
        </div>
    )
}