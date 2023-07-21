export type DiscordUser = {
    discordId: string;
    publicUsername: string;
}

export type User = {
    id: number;
    discordUser: DiscordUser;
    minecraftName: string | null;
    hasPayed: boolean;
    banned: boolean;
    admin: boolean;

}

export type Role = {
    name: string,
    R: number,
    G: number,
    B: number
}

export type PlaytimeData = {
    playtime: number,
    date: string
}

export type Playtime = {
    lastDaySeconds: number;
    lastWeekSeconds: number;
    lastMonthSeconds: number;
    allTimeSeconds: number;
  };





