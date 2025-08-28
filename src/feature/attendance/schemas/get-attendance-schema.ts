export const getAttendanceResponseSchema = {
	$id: "getAttendanceResponseSchema",
	type: "object",
	properties: {
		id: { type: "string" },
		cpf: { type: "string" },
		name: { type: "string" },
		service: { type: "string" },
		queue_type: { type: "string" },
		ticket_number: { type: "string" },
		status: {
			type: "string",
			enum: ["AGUARDANDO", "CHAMADO", "ATENDIMENTO", "ATENDIDO", "AUSENTE"],
		},
		guiche: {
			type: "string",
		},
	},
	required: ["cpf", "name", "service", "queue_type"],
} as const;

export const getAttendanceSchema = {
	$id: "getAttendanceSchema",
	tags: ["attendance"],
	description: "Buscar uma lista de Atendimentos",
	response: {
		200: getAttendanceResponseSchema,
		500: {
			$ref: "errorResponseSchema#",
		},
	},
} as const;
