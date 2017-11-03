"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var UsersApi_1 = require('./src/API/UsersApi');
function getUsers(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var userApi = new UsersApi_1["default"]();
        var result = yield userApi.getUsers(event);
        var response = {
            statusCode: 200,
            body: JSON.stringify({
                message: {
                    users: result
                },
                input: event
            })
        };
        callback(null, response);
    });
}
exports.getUsers = getUsers;
//# sourceMappingURL=handler.js.map