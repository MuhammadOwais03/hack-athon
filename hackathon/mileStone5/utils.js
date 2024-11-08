"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueResumeUrl = void 0;
const uuid_1 = require("uuid");
function generateUniqueResumeUrl(username) {
    const uniqueId = (0, uuid_1.v4)(); // Generate a unique identifier
    return `${window.location.origin}/resume/${username}/${uniqueId}`;
}
exports.generateUniqueResumeUrl = generateUniqueResumeUrl;
