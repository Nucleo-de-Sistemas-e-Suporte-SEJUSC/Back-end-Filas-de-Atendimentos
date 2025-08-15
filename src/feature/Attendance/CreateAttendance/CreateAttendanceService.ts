import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IAttendanceModel } from "../protocols/IAttendanceModel";
import { ICreateAttendance } from "../protocols/ICreateAttendance";
import { IAttendanceRepository } from "../protocols/IAttendanceRepository";
import { AlreadyExistAnAttendanceError } from "../errors/AlreadyExistAnAttendanceError";

export class CreateAttendanceService implements ICreateAttendance {
  constructor(private readonly repo: IAttendanceRepository) {}

  async create({
    cpf,
    name,
    service,
    queue_type,
  }: IAttendanceModel): Promise<AttendanceEntity> {
    const attendance = new AttendanceEntity(cpf, name, service, queue_type);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const alreadyExistAnAttendance = await this.repo.findByCpf(
      attendance.cpf,
      tenMinutesAgo
    );

    if (alreadyExistAnAttendance)
      throw new AlreadyExistAnAttendanceError(
        "Já existe um atendimento para este usuário nos últimos 10 minutos."
      );

    const numberOfAttendances = await this.repo.countByServiceAndQueueType(
      attendance.service,
      attendance.queue_type
    );
    const nextNumber = String(numberOfAttendances + 1).padStart(3, "0");
    const ticketNumber = `${attendance.service}-${attendance.queue_type[0]}-${nextNumber}`;

    return await this.repo.create(attendance, ticketNumber);
  }
}
