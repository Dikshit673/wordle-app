import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

export const envSchema = z.object({
  // Application settings
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  PORT: z.coerce.number().default(5000),

  // encryption keys
  WORD_SECRET: z.string(),

  // JWT
  JWT_SECRET: z.string(),

  // cookie name
  AUTH_COOKIE_NAME: z.string(),

  // trusted client
  TRUSTED_CLIENT_ID: z.string(),

  // HMAC
  HMAC_SECRET: z.string(),

  // URLs
  CLIENT_URL: z.url(),
});

export type EnvVarsType = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    z.treeifyError(parsed.error)
  );
  process.exit(1);
}

const _env = parsed.data;

const IS_DEV = _env.NODE_ENV === 'development';

const EnvVars = { ..._env, IS_DEV };

export { EnvVars };
