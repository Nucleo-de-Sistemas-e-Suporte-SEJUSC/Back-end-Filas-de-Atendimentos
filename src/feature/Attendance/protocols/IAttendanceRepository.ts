import { AttendanceEntity } from "../entities/AttendanceEntity";
import { EAttendanceStatus } from "./EAttendanceStatus";
import { IAttendanceModel } from "./IAttendanceModel";

export interface IAttendanceRepository {
  create(
    attendance: IAttendanceModel,
    ticket_number?: string
  ): Promise<AttendanceEntity>;
  findByCpf(cpf: string, tenMinutesAgo: Date): Promise<number>;
  countByServiceAndQueueType(
    service: "PAV" | "RCN",
    queueType: "P" | "N"
  ): Promise<number>;
  findAll(): Promise<AttendanceEntity[]>;
  findById(id: string): Promise<AttendanceEntity | null>;
  update(
    id: string,
    status: EAttendanceStatus,
    guiche?: string
  ): Promise<AttendanceEntity>;
}
