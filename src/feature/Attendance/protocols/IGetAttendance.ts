import { AttendanceEntity } from "@/feature/Attendance/entities/AttendanceEntity";

export interface IGetAttendance {
  findAll(): Promise<AttendanceEntity[]>;
}
