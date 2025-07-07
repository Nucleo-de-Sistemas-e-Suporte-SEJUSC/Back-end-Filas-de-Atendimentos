import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IUpdateAttendance } from "../protocols/IUpdateAttendance";

export class UpdateAttendanceController {
    constructor(private readonly service: IUpdateAttendance) { }

    async update(req: FastifyRequest, reply: FastifyReply): Promise<AttendanceEntity> {
        const { id } = req.params as { id: string }
        const { status, guiche } = req.body as { status: "AGUARDANDO" | "CHAMADO" | "ATENDIMENTO" | "ATENDIDO" | "AUSENTE", guiche: string }
        try {
            await this.service.update(id, status, guiche)
            return reply.status(204).send()
        } catch (error) {
            console.error(error)
            return reply.status(400).send(error)
        }
    }
}