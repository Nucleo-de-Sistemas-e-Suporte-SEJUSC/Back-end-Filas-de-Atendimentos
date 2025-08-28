import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { errorResponseSchema } from "@/feature/schemas/error-response-schemas";
import { attendanceRoutes } from "../routes/attendance-routes";

const app = fastify({ logger: false });

app.register(fastifyCors, {
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PATCH"],
});

app.addSchema(errorResponseSchema);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title:
				"API do sistema integrado ao atendimento dos beneficiários e ao gerenciamento das filas capaz de coletar informações da Ação.",
			version: "1.0.0",
		},
	},
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(attendanceRoutes, {
	prefix: "/api/attendance",
});

app.listen({ port: 8004, host: "0.0.0.0" }, (error) => {
	if (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
	console.log("Server running on port 8004. Its Works");
});
