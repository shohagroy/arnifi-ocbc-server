"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_USER_ROLE = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = ["search"];
exports.userSearchableFields = ["fullName", "contact", "email"];
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["SUPER_ADMIN"] = "super_admin";
})(ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = ENUM_USER_ROLE = {}));
