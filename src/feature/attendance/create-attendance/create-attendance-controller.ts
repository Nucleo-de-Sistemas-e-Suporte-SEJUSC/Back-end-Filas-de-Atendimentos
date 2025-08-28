import type { FastifyReply, FastifyRequest } from "fastify";
import { InternalServerError } from "@/feature/errors/internal-server-error";
import { AlreadyExistAnAttendanceError } from "../errors/already-exist-an-attendance-error";
import type { IAttendanceModel } from "../protocols/attendance-model-interface";
import type { ICreateAttendance } from "../protocols/createAttendance-interface";

export class CreateAttendanceController {
	constructor(private readonly service: ICreateAttendance) {}

	async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			const attendance = req.body as IAttendanceModel;
			const result = await this.service.create(attendance);
			return reply.status(201).send(result);
		} catch (error) {
			if (error instanceof AlreadyExistAnAttendanceError) {
				return reply.status(error.statusCode).send(error);
			}

			return reply.status(500).send(new InternalServerError());
		}
	}
}
