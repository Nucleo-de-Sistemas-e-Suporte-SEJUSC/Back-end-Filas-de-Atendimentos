export const updateAttendanceParamsSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
	},
	required: ["id"],
} as const;

export const updateAttendanceBodySchema = {
	type: "object",
	properties: {
		prevStatus: { type: "string" },
		status: {
			type: "string",
			enum: ["AGUARDANDO", "CHAMADO", "ATENDIMENTO", "ATENDIDO", "AUSENTE"],
		},
		guiche: { type: "string" },
	},
	required: ["prevStatus", "status"],
} as const;

export const updateAttendanceOkResponseSchema = {
	type: "object",
	properties: {
		cpf: { type: "string" },
		name: { type: "string" },
		service: {
			type: "string",
			enum: ["PAV", "RCN"],
		},
		queue_type: {
			type: "string",
			enum: ["N", "P"],
		},
		ticket_number: { type: "string" },
	},
	required: ["cpf", "name", "service", "queue_type"],
} as const;

export const errorResponseSchema = {
	$id: "errorResponseSchema",
	type: "object",
	properties: {
		statusCode: { type: "number" },
		code: { type: "number" },
		error: { type: "string" },
		message: { type: "string" },
	},
	required: ["statusCode", "code", "error", "message"],
} as const;

export const updateAttendanceSchema = {
	tags: ["attendance"],
	params: updateAttendanceParamsSchema,
	body: updateAttendanceBodySchema,
	response: {
		200: updateAttendanceOkResponseSchema,
		400: { $ref: "errorResponseSchema#" },
		500: { $ref: "errorResponseSchema#" },
	},
} as const;
