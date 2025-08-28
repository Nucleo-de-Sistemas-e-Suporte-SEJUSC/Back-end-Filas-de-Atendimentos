import type {
	FastifyBaseLogger,
	FastifyInstance,
	RawReplyDefaultExpression,
	RawServerDefault,
} from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedProvider = FastifyInstance<
	RawServerDefault,
	RawReplyDefaultExpression,
	RawReplyDefaultExpression,
	FastifyBaseLogger,
	ZodTypeProvider
>;
