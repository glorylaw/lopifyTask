"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const campaignRoute_1 = __importDefault(require("./routes/campaignRoute"));
config_1.db.sync().then(() => {
    console.log("db connected successfully");
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/', campaignRoute_1.default);
const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
