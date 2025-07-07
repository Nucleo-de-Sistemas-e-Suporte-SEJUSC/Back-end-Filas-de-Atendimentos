import { prisma } from "./PrismaClient";
import { AttendanceEntity } from "@/feature/Attendance/entities/AttendanceEntity";
import { IAttendanceModel } from "@/feature/Attendance/protocols/IAttendanceModel";
import { IAttendanceRepository } from "@/feature/Attendance/protocols/IAttendanceRepository";

export class PrismaAttendanceRepository implements IAttendanceRepository {
    async create({ cpf, name, service, queue_type }: IAttendanceModel, ticket_number: string): Promise<AttendanceEntity> {
        const result = await prisma.attendance.create({
            data: {
                cpf,
                name,
                queue_type,
                service,
                ticket_number
            }
        })

        return new AttendanceEntity(
            result.cpf,
            result.name,
            result.service,
            result.queue_type,
            result.ticket_number,
        )
    }

    async findByCpf(cpf: string, tenMinutesAgo: Date): Promise<number> {
        const result = await prisma.attendance.count({
            where: {
                cpf,
                created_at: {
                    gte: tenMinutesAgo,
                },
            },
        })

        return result
    }

    async countByServiceAndQueueType(service: 'PAV' | 'RCN', queueType: 'P' | 'N'): Promise<number> {
        const result = await prisma.attendance.count({
            where: {
                service: service,
                queue_type: queueType
            },
        })
        return result
    }

    async findAll(): Promise<AttendanceEntity[]> {
        const result = await prisma.attendance.findMany()
        return result.map((result, index) => {
            console.log(`[${index}]`, result)
            return new AttendanceEntity(
                result.cpf,
                result.name,
                result.service,
                result.queue_type,
                result.ticket_number,
                result.status,
                result.id,
                result.guiche ?? undefined
            )
        })
    }

    async findById(id: string): Promise<AttendanceEntity | null> {
        const result = await prisma.attendance.findFirst({
            where: {
                id: Number(id)
            },
        })

        return result ? new AttendanceEntity(
            result.cpf,
            result.name,
            result.service,
            result.queue_type,
            result.ticket_number,
        ) : null
    }

    async update(id: string, status: "AGUARDANDO" | "CHAMADO" | "ATENDIMENTO" | "ATENDIDO" | "AUSENTE", guiche?: string): Promise<AttendanceEntity> {
        const result = await prisma.attendance.update({
            where: { id: Number(id) },
            data: { status, guiche }
        })

        return new AttendanceEntity(
            result.cpf,
            result.name,
            result.service,
            result.queue_type,
            result.ticket_number,
        )
    }
}