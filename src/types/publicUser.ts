export interface PublicUser {
    user:       User;
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

export interface User {
    id:            number;
    discordUser:   DiscordUser;
    minecraftName: string;
    banned:        boolean;
}

export interface DiscordUser {
    discordId: string;
    Username:  string;
}