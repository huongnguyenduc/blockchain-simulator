// Minimize the address to a 4 character string
export function minimizeAddress(address: string): string {
    return address.slice(0, 4) + '...' + address.slice(-4);
}