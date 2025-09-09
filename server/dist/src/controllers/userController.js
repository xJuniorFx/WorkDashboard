"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: {
                team: {
                    select: {
                        teamName: true,
                    },
                },
            },
        });
        const usersWithTeamName = users.map((user) => {
            var _a;
            return ({
                userId: user.userId,
                username: user.username,
                profilePictureUrl: user.profilePictureUrl,
                teamId: user.teamId,
                teamName: ((_a = user.team) === null || _a === void 0 ? void 0 : _a.teamName) || 'No Team',
            });
        });
        res.json(usersWithTeamName);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.getUsers = getUsers;
