import type { FastifyReply, FastifyRequest } from "fastify";
import type { AttendanceDTO } from "../dto/attendance-dto";
import type { EAttendanceStatus } from "../protocols/attendance-status-enum";
import type { IUpdateAttendance } from "../protocols/update-attendance-interface";

export class UpdateAttendanceController {
	constructor(private readonly service: IUpdateAttendance) {}

	async update(
		req: FastifyRequest,
		reply: FastifyReply,
	): Promise<AttendanceDTO> {
		const { id } = req.params as { id: string };
		const { prevStatus, status, guiche } = req.body as {
			status: EAttendanceStatus;
			prevStatus: EAttendanceStatus;
			guiche: string;
		};
		try {
			await this.service.update(id, prevStatus, status, guiche);
			return reply.status(200).send();
		} catch (error) {
			console.error(error);
			return reply.status(400).send(error);
		}
	}
}
