import {cookies} from "next/headers";
import * as config from "@/config/config";
import {PrivateUser, UserRoles,} from "@/types/PrivateUser";

export class UserProviderBuilder {
    private searchParams: string[][] = [];

    constructor() {}

    public addUser() {
        this.searchParams.push(['include', 'user']);
        return this;
    }

    public addStats() {
        this.searchParams.push(['include', 'stats']);
        return this;
    }

    public addRoles() {
        this.searchParams.push(['include', 'roles']);
        return this;
    }
    public addLastOnline() {
        this.searchParams.push(['include', 'last-online']);
        return this;
    }

    public async execute(): Promise<PrivateUser | null> {

        const cookie = cookies().get('_dt');

        if (cookie == null) {
            return null;
        }

        const headers = new Headers();
        headers.append('Cookie', `_dt=${cookie.value}`);

        const searchParamsString = new URLSearchParams(this.searchParams).toString();

        const response = await fetch(`${config.apiUri}/api/v2/me?${searchParamsString}`, {
            method: 'GET',
            cache: 'no-store',
            headers: headers,
        });

        if (!response.ok) {
            return null;
        }


        const statusMapping: Record<string, UserRoles> = {
            "PLAYER": UserRoles.PLAYER,
            "EDITOR": UserRoles.EDITOR,
            "MODERATOR": UserRoles.MODERATOR,
            "ADMIN": UserRoles.ADMIN,
        };


        const u = await response.json() as PrivateUser;
        u.user.userRole = statusMapping[u.user.userRole]

        return u ;

    }
}

export function ServerUserProviderBuilder(): UserProviderBuilder {
    return new UserProviderBuilder();
}