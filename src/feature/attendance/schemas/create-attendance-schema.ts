export const errorResponseSchema = {
	$id: "errorResponseSchema",
	type: "object",
	properties: {
		statusCode: { type: "number" },
		code: { type: "string" },
		error: { type: "string" },
		message: { type: "string" },
	},
	required: ["statusCode", "code", "error", "message"],
} as const;

export const createAttendanceBodySchema = {
	$id: "createAttendanceBodySchema",
	type: "object",
	properties: {
		cpf: { type: "string" },
		name: { type: "string" },
		service: { type: "string" },
		queue_type: { type: "string" },
	},
	required: ["cpf", "name", "service", "queue_type"],
} as const;

export const createAttendanceResponseSchema = {
	$id: "createAttendanceResponseSchema",
	type: "object",
	properties: {
		cpf: { type: "string" },
		name: { type: "string" },
		service: { type: "string" },
		queue_type: { type: "string" },
		ticket_number: { type: "string" },
	},
	required: ["cpf", "name", "service", "queue_type", "ticket_number"],
} as const;

export const createAttendanceSchema = {
	$id: "createAttendanceSchema",
	tags: ["attendance"],
	description: "Cria um atendimento",
	body: createAttendanceBodySchema,
	response: {
		201: createAttendanceResponseSchema,
		409: {
			$ref: "errorResponseSchema#",
		},
		500: {
			$ref: "errorResponseSchema#",
		},
	},
} as const;
