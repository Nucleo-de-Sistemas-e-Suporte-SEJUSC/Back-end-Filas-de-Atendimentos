import type { AttendanceDTO } from "../dto/attendance-dto";
import type { IAttendanceModel } from "./attendance-model-interface";

export interface ICreateAttendance {
	create(
		attendance: IAttendanceModel,
		ticket_number?: string,
	): Promise<AttendanceDTO>;
}
