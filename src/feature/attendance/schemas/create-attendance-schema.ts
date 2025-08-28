import z from "zod";

export const createAttendanceSchema = {
	tags: ["attendance"],
	description: "Cria um atendimento",
	body: z.object({
		cpf: z.string(),
		name: z.string(),
		service: z.string(),
		queue_type: z.string(),
	}),
	response: {
		201: z.object({
			cpf: z.string(),
			name: z.string(),
			service: z.string(),
			queue_type: z.string(),
			ticket_number: z.string(),
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
