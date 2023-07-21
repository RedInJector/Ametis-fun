export interface PrivateUser {
    user:       PUser;
    statistics: Statistics;
    roles:      Role[];
}

export interface Role {
    name: string;
    R:    number;
    G:    number;
    B:    number;
}

export interface Statistics {
    time_all:     string;
    time_month:   string;
    time_week:    string;
    time_day:     string;
    last_online:  number;
    heatmap_data: HeatmapDatum[];
}

export interface HeatmapDatum {
    playtime: string;
    date:     Date;
}

export interface PUser {
    id:            number;
    discordUser:   DiscordUser;
    minecraftName: string;
    hasPayed:      boolean;
    banned:        boolean;
    admin:         boolean;
    unbannable:    boolean;
}

export interface DiscordUser {
    discordId: string;
    Username:  string;
}