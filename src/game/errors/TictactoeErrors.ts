export class InvalidGridError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "InvalidGridError";
    }
}

export class InvalidGridValueError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "InvalidGridValueError";
    }
}

export class WinnerAnalizerError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "WinnerAnalizeError";
    }
}