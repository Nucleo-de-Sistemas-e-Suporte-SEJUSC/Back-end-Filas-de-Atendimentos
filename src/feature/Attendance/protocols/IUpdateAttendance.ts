import { AttendanceEntity } from "../entities/AttendanceEntity";
import { EAttendanceStatus } from "./EAttendanceStatus";

export interface IUpdateAttendance {
  update(
    id: string,
    prevStatus: EAttendanceStatus,
    status: EAttendanceStatus,
    guiche?: string
  ): Promise<AttendanceEntity>;
}
