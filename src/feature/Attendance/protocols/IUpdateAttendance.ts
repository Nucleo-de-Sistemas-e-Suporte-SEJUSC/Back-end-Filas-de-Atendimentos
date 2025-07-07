import { AttendanceEntity } from "../entities/AttendanceEntity";

export interface IUpdateAttendance {
    update(id: string, status: 'AGUARDANDO' | 'CHAMADO' | 'ATENDIMENTO' | 'ATENDIDO' | 'AUSENTE', guiche?: string): Promise<AttendanceEntity>
}