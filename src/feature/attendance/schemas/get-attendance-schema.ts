import z from "zod";

export const getAttendanceSchema = {
	description: "Buscar uma lista de Atendimentos",
	tags: ["attendance"],
	response: {
		200: z
			.object({
				id: z.number().optional(),
				cpf: z.string(),
				name: z.string(),
				service: z.enum(["PAV", "RCN"]),
				queue_type: z.enum(["N", "P"]),
				ticket_number: z.string().optional(),
				status: z
					.enum(["AGUARDANDO", "CHAMADO", "ATENDIMENTO", "ATENDIDO", "AUSENTE"])
					.optional(),
				guiche: z.string().optional(),
			})
			.array(),
		500: z.object({
			statusCode: z.number(),
			code: z.number(),
			error: z.string(),
			message: z.string(),
		}),
	},
};
