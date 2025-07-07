import { FastifyInstance } from "fastify";
import { CreateAttendanceController } from "@/feature/Attendance/CreateAttendance/CreateAttendanceController";
import { CreateAttendanceService } from "@/feature/Attendance/CreateAttendance/CreateAttendanceService";
import { GetAttendanceController } from "@/feature/Attendance/GetAttendance/GetAttendanceController";
import { GetAttendanceService } from "@/feature/Attendance/GetAttendance/GetAttendanceService";
import { PrismaAttendanceRepository } from "@/infra/db/prisma/PrismaAttendanceRepository";
import { UpdateAttendanceService } from "@/feature/Attendance/UpdateAttendance/UpdateAttendanceService";
import { UpdateAttendanceController } from "@/feature/Attendance/UpdateAttendance/UpdateAttendanceController";

export async function attendanceRoutes(fastify: FastifyInstance) {
    const repo = new PrismaAttendanceRepository()

    const createAttendanceService = new CreateAttendanceService(repo)
    const createAttendanceController = new CreateAttendanceController(createAttendanceService)
    fastify.post('/', (req, reply) => createAttendanceController.create(req, reply))

    const getAttendanceService = new GetAttendanceService(repo)
    const getAttendanceController = new GetAttendanceController(getAttendanceService)
    fastify.get('/', (req, reply) => getAttendanceController.get(req, reply))

    const updateAttendanceService = new UpdateAttendanceService(repo)
    const updateAttendanceController= new UpdateAttendanceController(updateAttendanceService)
    fastify.patch('/:id', (req, reply) => updateAttendanceController.update(req, reply))
}