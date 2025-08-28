import z from "zod";

export const updateAttendanceSchema = {
	tags: ["attendance"],
	description: "Atualiza um atendimento",
	params: z.object({
		id: z.string(),
	}),
	body: z.object({
		prevStatus: z.string(),
		status: z.enum([
			"AGUARDANDO",
			"CHAMADO",
			"ATENDIMENTO",
			"ATENDIDO",
			"AUSENTE",
		]),
		guiche: z.string().optional(),
	}),
	response: {
		200: z.object({
			cpf: z.string(),
			name: z.string(),
			service: z.enum(["PAV", "RCN"]),
			queue_type: z.enum(["N", "P"]),
			ticket_number: z.string().optional(),
		}),
		400: z.object({
			statusCode: z.number(),
			code: z.number(),
			error: z.string(),
			message: z.string(),
		}),
		500: z.object({
			statusCode: z.number(),
			code: z.number(),
			error: z.string(),
			message: z.string(),
		}),
	},
};
