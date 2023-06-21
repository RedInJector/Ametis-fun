/*export type User = {
    id: string;
    discordId: string;
    publicUsername: string;
    tag?: string | null;
    avatarUrl: string;
    discriminator: string;
    token: string;
}*/

export type DiscordUser = {
    id: number | null;
    discordId: string;
    publicUsername: string;
    tag: string | null;
    avatarUrl: string;
    discriminator: string;
    email: string;
    discordVerified: boolean;
}

export type MinecraftPlayer = {
    id: number | null;
    playerName: string;
    allowedOnServer: boolean;
}

export type User = {
    id: number;
    discordUser: DiscordUser;
    minecraftPlayer: MinecraftPlayer | null;
    hasPayed: boolean;
    isMinecraftNameSet: boolean;
    isBanned: boolean;
    minecraftNameSet: boolean;
    banned: boolean;
}



import * as config from "../config";


/*
export async function getUserData(token: string): Promise<User | null> {
    try {
        const res = await fetch(`${config.apiUrl}/api/v1/getuserdata`, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const user = (await res.json()) as User;
        user.token = token;
        return user;
    } catch (error) {
        console.error('An error occurred while fetching user data ' + error);
        return null;
    }
}
*/
export function logOut(token: string) {
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