import type { FastifyReply, FastifyRequest } from "fastify";
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
			console.log(error);
			return reply.status(400).send(error);
		}
	}
}
