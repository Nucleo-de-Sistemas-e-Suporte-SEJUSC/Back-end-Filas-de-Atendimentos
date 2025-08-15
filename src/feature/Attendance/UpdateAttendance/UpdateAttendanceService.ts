import { IUpdateAttendance } from "../protocols/IUpdateAttendance";
import { IAttendanceRepository } from "../protocols/IAttendanceRepository";
import { AttendanceEntity } from "../entities/AttendanceEntity";
import { EAttendanceStatus } from "../protocols/EAttendanceStatus";
import { ExistAnAttendanceError } from "../errors/ExistAnAttendanceError";
import { AlreadyStatusModifiedError } from "../errors/AlreadyStatusModifiedError";

export class UpdateAttendanceService implements IUpdateAttendance {
  constructor(private readonly repo: IAttendanceRepository) {}

  async update(
    id: string,
    prevStatus: EAttendanceStatus,
    status: EAttendanceStatus,
    guiche?: string
  ): Promise<AttendanceEntity> {
    const alreadyExistAnAttendance = await this.repo.findById(id);

    if (!alreadyExistAnAttendance)
      throw new ExistAnAttendanceError(
        "Não existe um atendimento para esse id"
      );

    if (alreadyExistAnAttendance?.status !== prevStatus)
      throw new AlreadyStatusModifiedError(
        "O status do atendimento já foi modificado, atualize a página"
      );

    return await this.repo.update(id, status, guiche);
  }
}
