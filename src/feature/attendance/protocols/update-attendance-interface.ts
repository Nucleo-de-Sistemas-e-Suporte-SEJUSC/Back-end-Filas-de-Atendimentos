import type { AttendanceDTO } from "../dto/attendance-dto";
import type { EAttendanceStatus } from "./attendance-status-enum";

export interface IUpdateAttendance {
	update(
		id: string,
		prevStatus: EAttendanceStatus,
		status: EAttendanceStatus,
		guiche?: string,
	): Promise<AttendanceDTO>;
}
