import type { FastifyReply, FastifyRequest } from "fastify";
import type { IGetAttendance } from "../protocols/get-attendance-interface";

export class GetAttendanceController {
	constructor(private readonly service: IGetAttendance) {}

	async get(_req: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			const data = await this.service.findAll();
			return reply.status(200).send(data);
		} catch (error) {
			console.log(error);
			reply.status(500).send(error);
		}
	}
}
