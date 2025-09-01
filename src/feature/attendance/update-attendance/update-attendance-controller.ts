import type { FastifyReply, FastifyRequest } from "fastify";
import { InternalServerError } from "@/feature/errors/internal-server-error";
import type { AttendanceDTO } from "../dto/attendance-dto";
import { AlreadyStatusModifiedError } from "../errors/already-status-modified-error";
import { ExistAnAttendanceError } from "../errors/exist-an-attendance-error";
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
			if (
				error instanceof ExistAnAttendanceError ||
				error instanceof AlreadyStatusModifiedError
			) {
				return reply.status(error.statusCode).send(error);
			}

			return reply.status(500).send(new InternalServerError());
		}
	}
}
