import type { AttendanceDTO } from "../dto/attendance-dto";
import type { IAttendanceRepository } from "../protocols/attendance-repository-interface";
import type { IGetAttendance } from "../protocols/get-attendance-interface";

export class GetAttendanceService implements IGetAttendance {
	constructor(private readonly repo: IAttendanceRepository) {}

	async findAll(): Promise<AttendanceDTO[]> {
		return await this.repo.findAll();
	}
}
