import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IGetAttendance } from "../protocols/IGetAttendance";
import { IAttendanceRepository } from "../protocols/IAttendanceRepository";

export class GetAttendanceService implements IGetAttendance {
  constructor(private readonly repo: IAttendanceRepository) {}

  async findAll(): Promise<AttendanceEntity[]> {
    return await this.repo.findAll();
  }
}
