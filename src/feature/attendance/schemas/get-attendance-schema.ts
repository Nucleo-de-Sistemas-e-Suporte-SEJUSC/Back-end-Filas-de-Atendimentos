export const attendanceItemSchema = {
	$id: "attendanceItemSchema",
	type: "object",
	properties: {
		id: { type: "number" },
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
	required: [
		"id",
		"cpf",
		"name",
		"service",
		"queue_type",
		"ticket_number",
		"status",
		"guiche",
	],
} as const;

export const getAttendanceResponseSchema = {
	$id: "getAttendanceResponseSchema",
	type: "array",
	items: {
		attendanceItemSchema,
	},
} as const;

export const getAttendanceSchema = {
	$id: "getAttendanceSchema",
	tags: ["attendance"],
	response: {
		200: getAttendanceResponseSchema,
		500: {
			$ref: "errorResponseSchema#",
		},
	},
} as const;
