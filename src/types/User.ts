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
}

export type User = {
    id: number;
    discordUser: DiscordUser;
    minecraftPlayer: MinecraftPlayer | null;
    hasPayed: boolean;
    banned: boolean;
    admin: boolean;
}

