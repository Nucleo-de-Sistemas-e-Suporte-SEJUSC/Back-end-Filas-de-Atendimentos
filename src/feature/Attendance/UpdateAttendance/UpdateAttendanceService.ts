import { IUpdateAttendance } from "../protocols/IUpdateAttendance";
import { IAttendanceRepository } from "../protocols/IAttendanceRepository";
import { AttendanceEntity } from "../entities/AttendanceEntity";

export class UpdateAttendanceService implements IUpdateAttendance{
    constructor(private readonly repo: IAttendanceRepository) {}

    async update(id: string, status: "AGUARDANDO" | "CHAMADO" | "ATENDIMENTO" | "ATENDIDO" | "AUSENTE", guiche?: string): Promise<AttendanceEntity> {
        const alreadyExistAnAttendance = await this.repo.findById(id)

        if (!alreadyExistAnAttendance) throw new Error('Já existe um CPF cadastrado para um atendimento.')
        
        const result = await this.repo.update(id, status, guiche)
        return result
    }
}