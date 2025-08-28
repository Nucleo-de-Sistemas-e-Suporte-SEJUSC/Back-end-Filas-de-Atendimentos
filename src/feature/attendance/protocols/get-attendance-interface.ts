import type { AttendanceDTO } from "@/feature/attendance/dto/attendance-dto";

export interface IGetAttendance {
	findAll(): Promise<AttendanceDTO[]>;
}
