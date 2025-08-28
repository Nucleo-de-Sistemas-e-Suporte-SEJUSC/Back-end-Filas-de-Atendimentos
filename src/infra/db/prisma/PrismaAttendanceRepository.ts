import { AttendanceDTO } from "@/feature/attendance/dto/attendance-dto";
import type { IAttendanceModel } from "@/feature/attendance/protocols/attendance-model-interface";
import type { IAttendanceRepository } from "@/feature/attendance/protocols/attendance-repository-interface";
import type { EAttendanceStatus } from "@/feature/attendance/protocols/attendance-status-enum";
import { prisma } from "./PrismaClient";

export class PrismaAttendanceRepository implements IAttendanceRepository {
	async create(
		{ cpf, name, service, queue_type }: IAttendanceModel,
		ticket_number: string,
	): Promise<AttendanceDTO> {
		const result = await prisma.attendance.create({
			data: {
				cpf,
				name,
				queue_type,
				service,
				ticket_number,
			},
		});

		return new AttendanceDTO(
			result.cpf,
			result.name,
			result.service,
			result.queue_type,
			result.ticket_number,
		);
	}

	async findByCpf(cpf: string, tenMinutesAgo: Date): Promise<number> {
		const result = await prisma.attendance.count({
			where: {
				cpf,
				created_at: {
					gte: tenMinutesAgo,
				},
			},
		});

		return result;
	}

	async countByServiceAndQueueType(
		service: "PAV" | "RCN",
		queueType: "P" | "N",
	): Promise<number> {
		const result = await prisma.attendance.count({
			where: {
				service: service,
				queue_type: queueType,
			},
		});
		return result;
	}

	async findAll(): Promise<AttendanceDTO[]> {
		const result = await prisma.attendance.findMany();
		return result.map((result) => {
			return new AttendanceDTO(
				result.cpf,
				result.name,
				result.service,
				result.queue_type,
				result.ticket_number,
				result.status,
				result.id,
				result.guiche ?? undefined,
			);
		});
	}

	async findById(id: string): Promise<AttendanceDTO | null> {
		const result = await prisma.attendance.findFirst({
			where: {
				id: Number(id),
			},
		});

		return result
			? new AttendanceDTO(
					result.cpf,
					result.name,
					result.service,
					result.queue_type,
					result.ticket_number,
					result.status,
				)
			: null;
	}

	async update(
		id: string,
		status: EAttendanceStatus,
		guiche?: string,
	): Promise<AttendanceDTO> {
		const result = await prisma.attendance.update({
			where: { id: Number(id) },
			data: { status, guiche },
		});

		return new AttendanceDTO(
			result.cpf,
			result.name,
			result.service,
			result.queue_type,
			result.ticket_number,
		);
	}
}
