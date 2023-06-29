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
    skinUrl: string;
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