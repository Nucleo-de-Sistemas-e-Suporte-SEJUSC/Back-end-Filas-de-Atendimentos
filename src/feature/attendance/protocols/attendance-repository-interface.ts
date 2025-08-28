import type { AttendanceDTO } from "../dto/attendance-dto";
import type { IAttendanceModel } from "./attendance-model-interface";
import type { EAttendanceStatus } from "./attendance-status-enum";

export interface IAttendanceRepository {
	create(
		attendance: IAttendanceModel,
		ticket_number?: string,
	): Promise<AttendanceDTO>;
	findByCpf(cpf: string, tenMinutesAgo: Date): Promise<number>;
	countByServiceAndQueueType(
		service: "PAV" | "RCN",
		queueType: "P" | "N",
	): Promise<number>;
	findAll(): Promise<AttendanceDTO[]>;
	findById(id: string): Promise<AttendanceDTO | null>;
	update(
		id: string,
		status: EAttendanceStatus,
		guiche?: string,
	): Promise<AttendanceDTO>;
}
