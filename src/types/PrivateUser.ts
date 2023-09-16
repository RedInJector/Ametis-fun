
// TODO: Last online???? where? stats or here?
export interface PrivateUser {
    user:       PUser;
    statistics?: Statistics;
    roles?:      Role[];
}

export interface Role {
    name: string;
    R:    number;
    G:    number;
    B:    number;
}

export interface Statistics {
    time_all:     number;
    time_month:   number;
    time_week:    number;
    time_day:     number;
    last_online:  number;
    heatmap_data: HeatmapDatum[];
}

export interface HeatmapDatum {
    playtime: string;
    date:     Date;
}

export interface PUser {
    id: number;
    discordUser: DiscordUser;
    minecraftName: string | null;
    hasPayed: boolean;
    banned: boolean;
    admin: boolean;
    unbannable: boolean;
    userRole: UserRoles
}



export interface DiscordUser {
    discordId: string;
    Username: string; // Make sure the property name matches the API response
}

export enum UserRoles {
    PLAYER = 0,
    EDITOR = 1,
    MODERATOR = 2,
    ADMIN = 3
}
