export  default function ConvertToTag(num: number, length: number): string {
    const numString = num.toString();
    return numString.padStart(length, '0');
}