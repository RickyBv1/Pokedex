export interface Data {
    count: number,
    next: string,
    previous: string,
    results: Resultant[]
}

export interface Resultant {
    name: string,
    url: string,
}