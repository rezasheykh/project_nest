"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('post', () => {
    return {
        currency: process.env.CURRENCY,
        ShowMobileNumber: process.env.SHOW_MOBIL_NAMBER,
    };
});
//# sourceMappingURL=post.config.js.map