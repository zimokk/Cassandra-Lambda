import {types, Client} from "cassandra-driver";
import {DbConnection} from "memeni-lambda/public/lib/dataaccess/ClientPool";
import {User} from "memeni-lambda/public/lib/models/user";
import Uuid = types.Uuid;

export class UsersAPI {

    private userName: string;
    private _client: any; //DbConnection;

    constructor() {
        this._client = new Client({ contactPoints: ['54.85.164.35'], keyspace: 'memeni' });
        // this._client = new DbConnection();
    }

    public async getUsers(event: any): Promise<User[]>{
        this.extractQueryParams(event);

        let uuidQuery = 'select user from keys_mapping where key=?';
        let params = [this.userName];
        let uuidResult = await this._client.execute(uuidQuery, [this.userName]);
        let userUuid = uuidResult.rows[0].user;

        let usersQuery = `select * from users where key=?;`;
        let users = await this._client.execute(usersQuery, [userUuid]);

        return users.rows;
    }

    extractQueryParams(event: any) {
        if (event.queryStringParameters && event.queryStringParameters.userName) {
            this.userName = event.queryStringParameters.userName || this.userName;
        }
    }

    // private retrieveUsers(userUuids: any){
    //     let self = this;
    //     console.log(userUuids[0].user);
    //     return "USER";
    //     // return new Promise((resolve) => {
    //     //     self.getUuidKeyRequest().then(function (userUuid: any) {
    //     //         self.getUserRequest(userUuid).then(function (result: any) {
    //     //             resolve(result);
    //     //         })
    //     //     });
    //     // });
    // }
    // // private getUserRequest(key: types.Uuid){
    // //     return new Promise((resolve) => {
    // //         let query = `select * from users where key=?;`;
    // //         let params = [key];
    // //         this.client.execute(query, params)
    // //             .then(function (result:any) {
    // //                 resolve(result);
    // //             });
    // //     });
    // // }
    //
    // private async getUuidKeyRequest(): Promise<User[]>{
    //     let query = 'select user from keys_mapping where key=?';
    //     let params = [this.userName];
    //     let result = await this._client.execute(query, params);
    //     return result.rows;
    // }
}
export default UsersAPI;