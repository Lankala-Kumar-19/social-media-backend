"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoClient_1 = require("./mongoClient");
const PORT = process.env.PORT || 5000;
async function startServer() {
    await (0, mongoClient_1.connectToDb)();
    app_1.default.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map