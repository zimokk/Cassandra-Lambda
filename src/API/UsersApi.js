"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var cassandra_driver_1 = require("cassandra-driver");
var UsersAPI = (function () {
    function UsersAPI() {
        this._client = new cassandra_driver_1.Client({ contactPoints: ['54.85.164.35'], keyspace: 'memeni' });
        // this._client = new DbConnection();
    }
    UsersAPI.prototype.getUsers = function (event) {
        return __awaiter(this, void 0, Promise, function* () {
            this.extractQueryParams(event);
            var uuidQuery = 'select user from keys_mapping where key=?';
            var params = [this.userName];
            var uuidResult = yield this._client.execute(uuidQuery, [this.userName]);
            var userUuid = uuidResult.rows[0].user;
            var usersQuery = "select * from users where key=?;";
            var users = yield this._client.execute(usersQuery, [userUuid]);
            return users.rows;
        });
    };
    UsersAPI.prototype.extractQueryParams = function (event) {
        if (event.queryStringParameters && event.queryStringParameters.userName) {
            this.userName = event.queryStringParameters.userName || this.userName;
        }
    };
    return UsersAPI;
}());
exports.UsersAPI = UsersAPI;
exports.__esModule = true;
exports["default"] = UsersAPI;
//# sourceMappingURL=UsersApi.js.map