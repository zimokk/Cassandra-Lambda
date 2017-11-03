import { User } from "memeni-lambda/public/lib/models/user";
export declare class UsersAPI {
    private userName;
    private _client;
    constructor();
    getUsers(event: any): Promise<User[]>;
    extractQueryParams(event: any): void;
}
export default UsersAPI;
