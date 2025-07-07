import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { attendanceRoutes } from "../routes/attendanceRoutes"

const app = fastify({logger: false})

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH']
})

app.register(attendanceRoutes, {
    prefix: '/v1/attendance',
})

app.listen({ port:8080 }, () => {
    console.log('Server running on port 8080')
})