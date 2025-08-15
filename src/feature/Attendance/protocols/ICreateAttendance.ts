import { AttendanceEntity } from "../entities/AttendanceEntity";
import { IAttendanceModel } from "./IAttendanceModel";

export interface ICreateAttendance {
  create(
    attendance: IAttendanceModel,
    ticket_number?: string
  ): Promise<AttendanceEntity>;
}
