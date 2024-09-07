export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    // getMonth() returns 0-11, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
export function getCurrentDateTime() {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const now = new Date();
    return now.toLocaleString('en-US', options);
}
