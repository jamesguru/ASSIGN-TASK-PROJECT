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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.deleteTask = exports.assignTask = exports.updateTask = exports.getTasksForDeveloper = exports.getAllTasks = void 0;
const connect_db_1 = require("../Helpers/connect_db");
const mssql_1 = __importDefault(require("mssql"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        const tasks = yield (pool === null || pool === void 0 ? void 0 : pool.request().execute('getAllTasks'));
        res.status(200).json({
            tasks: tasks === null || tasks === void 0 ? void 0 : tasks.recordset
        });
    }
    catch (error) {
        res.status(500).json('something went wrong');
    }
});
exports.getAllTasks = getAllTasks;
const getTasksForDeveloper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        const task = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('id', mssql_1.default.Int, id).execute('getTaskAssignedToDeveloper'));
        res.status(200).json({ task: task === null || task === void 0 ? void 0 : task.recordset });
    }
    catch (error) {
    }
});
exports.getTasksForDeveloper = getTasksForDeveloper;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    const { completed } = req.body;
    console.log(completed);
    console.log('update');
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        const task = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('id', mssql_1.default.Int, task_id).input('assigned', mssql_1.default.NVarChar, completed).execute('updateTask'));
        res.status(201).json({ task });
    }
    catch (error) {
    }
});
exports.updateTask = updateTask;
const assignTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    const { developer_id, assigned } = req.body;
    console.log(developer_id);
    console.log(task_id);
    console.log(assigned);
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        const task = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('id', mssql_1.default.Int, task_id).input('dev_id', mssql_1.default.Int, developer_id).input('assigned', mssql_1.default.NVarChar, assigned).execute('assignTask'));
        res.status(201).json({ task });
    }
    catch (error) {
    }
});
exports.assignTask = assignTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        yield (pool === null || pool === void 0 ? void 0 : pool.request().input("id", mssql_1.default.Int, task_id).execute('deleteTask'));
    }
    catch (error) {
        res.status(201).json({ message: 'task was not deleted successfully' });
    }
});
exports.deleteTask = deleteTask;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date } = req.body;
    try {
        const pool = yield (0, connect_db_1.connectDB)();
        const task = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('title', mssql_1.default.VarChar, title).input('description', mssql_1.default.VarChar, description).input('date', mssql_1.default.VarChar, date).execute('addTask'));
        res.status(201).json({ task: task === null || task === void 0 ? void 0 : task.recordset });
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong' });
    }
});
exports.addTask = addTask;