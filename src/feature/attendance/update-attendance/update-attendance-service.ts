import type { AttendanceDTO } from "../dto/attendance-dto";
import { AlreadyStatusModifiedError } from "../errors/already-status-modified-error";
import { ExistAnAttendanceError } from "../errors/exist-an-attendance-error";
import type { IAttendanceRepository } from "../protocols/attendance-repository-interface";
import type { EAttendanceStatus } from "../protocols/attendance-status-enum";
import type { IUpdateAttendance } from "../protocols/update-attendance-interface";

export class UpdateAttendanceService implements IUpdateAttendance {
	constructor(private readonly repo: IAttendanceRepository) {}

	async update(
		id: string,
		prevStatus: EAttendanceStatus,
		status: EAttendanceStatus,
		guiche?: string,
	): Promise<AttendanceDTO> {
		const alreadyExistAnAttendance = await this.repo.findById(id);

		if (!alreadyExistAnAttendance)
			throw new ExistAnAttendanceError(
				"Não existe um atendimento para esse id",
			);

		if (alreadyExistAnAttendance?.status !== prevStatus)
			throw new AlreadyStatusModifiedError(
				"O status do atendimento já foi modificado, atualize a página",
			);

		return await this.repo.update(id, status, guiche);
	}
}
