export class User {
    username:   string;
    token:      string;
    expiresIn:  Date;

    constructor(username: string, token: string, expiresIn: Date) {
        this.username = username;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}