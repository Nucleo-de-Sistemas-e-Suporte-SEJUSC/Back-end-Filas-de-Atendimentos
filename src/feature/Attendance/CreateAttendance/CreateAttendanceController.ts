import { FastifyReply, FastifyRequest } from "fastify";
import { ICreateAttendance } from "../protocols/ICreateAttendance";
import { IAttendanceModel } from "../protocols/IAttendanceModel";

export class CreateAttendanceController {
    constructor(private readonly service: ICreateAttendance) {}

    async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const attendance = req.body as IAttendanceModel
            const result = await this.service.create(attendance)
            return reply.status(201).send(result)
        } catch (error) {
            return reply.status(400).send(error)
        }
    }
}