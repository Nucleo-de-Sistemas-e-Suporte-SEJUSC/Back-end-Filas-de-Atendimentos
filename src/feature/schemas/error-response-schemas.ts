export const errorResponseSchema = {
	$id: "errorResponseSchema",
	type: "object",
	properties: {
		statusCode: { type: "number" },
		code: { type: "string" },
		error: { type: "string" },
		message: { type: "string" },
	},
} as const;
