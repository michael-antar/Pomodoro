export function displayTime(seconds: number) {
    const mm = (seconds < 600 ? '0' : '') + (Math.floor(seconds / 60));
    const ss = ((seconds % 60) < 10 ? '0' : '') + (seconds % 60);
    return `${mm}:${ss}`;
}