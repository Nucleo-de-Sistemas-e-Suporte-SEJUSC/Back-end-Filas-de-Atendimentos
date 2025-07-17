import { IUpdateAttendance } from "../protocols/IUpdateAttendance";
import { IAttendanceRepository } from "../protocols/IAttendanceRepository";
import { AttendanceEntity } from "../entities/AttendanceEntity";
import { EAttendanceStatus } from "../protocols/EAttendanceStatus";

export class UpdateAttendanceService implements IUpdateAttendance{
    constructor(private readonly repo: IAttendanceRepository) {}

    async update(id: string, prevStatus: EAttendanceStatus, status: EAttendanceStatus, guiche?: string): Promise<AttendanceEntity> {
        const alreadyExistAnAttendance = await this.repo.findById(id)

        if (!alreadyExistAnAttendance) throw new Error('Já existe um CPF cadastrado para um atendimento.')

        if (alreadyExistAnAttendance?.status !== prevStatus) throw new Error('O status do atendimento já foi modificado, atualize a página')
        
        const result = await this.repo.update(id, status, guiche)
        return result
    }
}