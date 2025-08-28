import { CreateAttendanceController } from "@/feature/attendance/create-attendance/create-attendance-controller";
import { CreateAttendanceService } from "@/feature/attendance/create-attendance/create-attendance-service";
import { GetAttendanceController } from "@/feature/attendance/get-attendance/get-attendance-controller";
import { GetAttendanceService } from "@/feature/attendance/get-attendance/get-attendance-service";
import { createAttendanceSchema } from "@/feature/attendance/schemas/create-attendance-schema";
import { getAttendanceSchema } from "@/feature/attendance/schemas/get-attendance-schema";
import { updateAttendanceSchema } from "@/feature/attendance/schemas/update-attendance-schema";
import { UpdateAttendanceController } from "@/feature/attendance/update-attendance/update-attendance-controller";
import { UpdateAttendanceService } from "@/feature/attendance/update-attendance/update-attendance-service";
import { PrismaAttendanceRepository } from "@/infra/db/prisma/PrismaAttendanceRepository";
import type { FastifyTypedProvider } from "./fastify-typed-provider";

export async function attendanceRoutes(fastify: FastifyTypedProvider) {
	const repo = new PrismaAttendanceRepository();

	const createAttendanceService = new CreateAttendanceService(repo);
	const createAttendanceController = new CreateAttendanceController(
		createAttendanceService,
	);
	fastify.post(
		"/",
		{
			schema: createAttendanceSchema,
		},
		(req, reply) => createAttendanceController.create(req, reply),
	);

	const getAttendanceService = new GetAttendanceService(repo);
	const getAttendanceController = new GetAttendanceController(
		getAttendanceService,
	);
	fastify.get(
		"/",
		{
			schema: getAttendanceSchema,
		},
		(req, reply) => getAttendanceController.get(req, reply),
	);

	const updateAttendanceService = new UpdateAttendanceService(repo);
	const updateAttendanceController = new UpdateAttendanceController(
		updateAttendanceService,
	);
	fastify.patch("/:id", { schema: updateAttendanceSchema }, (req, reply) =>
		updateAttendanceController.update(req, reply),
	);
}
