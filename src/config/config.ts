export const secure = false;
export function http(){
    if(secure)
        return 'https://'
    
        return 'http://'
}
export function ws(){
    if(secure)
        return 'wss://'
    
        return 'ws://'
}

export const authUrl = "https://discord.com/api/oauth2/authorize?client_id=985218368007192608&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fredirect&response_type=code&scope=identify%20email";
export const apiUrl = "localhost:8080"
export const apiUri = http() + apiUrl;
export const mapURL = "";
export const discordUrl = "https://discord.gg/kJANC3REeY";

export const telegramUrl = "https://t.me/ametis_mc";
export const donatelloURL = "";

export const serverip = "play.ametis.xyz";

export const discordiconUrl = "";

