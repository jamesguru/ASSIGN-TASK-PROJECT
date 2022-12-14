"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Task_1 = require("../Controllers/Task");
const router = (0, express_1.Router)();
router.get("/", Task_1.getAllTasks);
router.get("/assigned/:id", Task_1.getTasksForDeveloper);
router.put("/assign/:id", Task_1.assignTask);
router.put("/unassign/:id", Task_1.unassignTask);
router.put("/:id", Task_1.updateTask);
router.delete("/:id", Task_1.deleteTask);
router.post("/", Task_1.addTask);
exports.default = router;
