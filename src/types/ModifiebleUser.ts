import {PrivateUser} from "@/types/PrivateUser";
import * as c from '@/config/config'
import {stat} from "fs";


export default class ModifiebleUser {
    private user: PrivateUser;
    private banReason:string = "banned by admin";
    private changes: Map<string, string> = new Map();

    constructor(user: PrivateUser) {

        this.user = structuredClone(user);
        this.changes.set("id", String(user.user.id))
    }

    get getUser(): PrivateUser{
        return this.user;
    }

    public setBan(status: boolean){
        this.user.user.banned = status;
        this.changes.set("setBan", String(status));
        return this;
    }

    public setUnbannable(status: boolean){
        this.user.user.unbannable = status;
        this.changes.set("setUnbannable", String(status));
        return this;
    }

    setBanReason(reason: string){
        this.banReason = reason;
        this.changes.set("banReason", reason);
        return this;
    }

    setHasPayed(status: boolean){
        this.user.user.hasPayed = status
        this.changes.set("setHasPayed", String(status));
        return this;
    }



    public async update(): Promise<boolean> {
        const plainObject: { [key: string]: string } = {};
        this.changes.forEach((value, key) => {
            plainObject[key] = value;
        });


        const res = await fetch(c.apiUri + '/api/v2/admin/update-user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainObject),
            cache: 'no-store',
        })

        if(!res.ok) {
            return false;
        }

        this.changes.clear();
        this.changes.set("id", String(this.user.user.id))

        return true;
    }

}