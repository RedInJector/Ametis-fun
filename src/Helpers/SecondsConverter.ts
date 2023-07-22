export function ConvertSecondsToTime(seconds: number | undefined) {
    const minutesInDay = 1440;

    if(seconds==undefined)
        return '0 хв.'

    if(seconds == 0)
        return '0 хв.'

    if (seconds == -1)
        return "Ніколи";


    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    const timeComponents = [];

    if (days > 0) {
        timeComponents.push(`${days} дн.  `);
    }
    if (hours > 0) {
        timeComponents.push(`${hours} год.  `);
    }
    if (minutes > 0) {
        timeComponents.push(`${minutes} хв.  `);
    }
    if (seconds > 0 && hours == 0) {
        timeComponents.push(`${seconds} сек.  `);
    }

    const timeString = timeComponents.join(" ");

    return timeString;

}