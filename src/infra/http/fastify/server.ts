import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { attendanceRoutes } from "../routes/attendanceRoutes"
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify({logger: false})

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH']
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API para coletar dados da quantidade de Atendimentos e otimizar o Atendimento e a fila nas ações.',
            version: '1.0.0'
        }
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(attendanceRoutes, {
    prefix: '/v1/attendance',
})

app.listen({ port:8080 }, () => {
    console.log('Server running on port 8080. Its Works')
})