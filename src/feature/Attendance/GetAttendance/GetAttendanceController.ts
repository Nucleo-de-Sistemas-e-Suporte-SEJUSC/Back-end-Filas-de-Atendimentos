import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IGetAttendance } from "../protocols/IGetAttendance";

export class GetAttendanceController {
  constructor(private readonly service: IGetAttendance) {}

  async get(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = await this.service.findAll();

      if (data.length === 0) {
        return reply.status(404).send({
          message: "Nenhum atendimento encontrado.",
        });
      }
      return reply.status(200).send(data);
    } catch (error) {
      console.log(error);
      reply.status(500).send(error);
    }
  }
}
