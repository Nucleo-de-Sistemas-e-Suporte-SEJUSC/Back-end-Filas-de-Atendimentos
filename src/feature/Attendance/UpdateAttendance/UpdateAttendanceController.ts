import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IUpdateAttendance } from "../protocols/IUpdateAttendance";
import { EAttendanceStatus } from "../protocols/EAttendanceStatus";

export class UpdateAttendanceController {
    constructor(private readonly service: IUpdateAttendance) { }

    async update(req: FastifyRequest, reply: FastifyReply): Promise<AttendanceEntity> {
        const { id } = req.params as { id: string }
        const { prevStatus, status, guiche } = req.body as { status: EAttendanceStatus, prevStatus: EAttendanceStatus, guiche: string }
        try {
            await this.service.update(id, prevStatus, status, guiche)
            return reply.status(200).send()
        } catch (error) {
            console.error(error)
            return reply.status(400).send(error)
        }
    }
}