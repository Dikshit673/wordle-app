import z from 'zod';

export const envSchema = z.object({
  // Application settings
  NODE_ENV: z.enum(['development', 'production']).default('production'),

  // encryption keys
  WORD_SECRET: z.string(),

  // HMAC
  HMAC_SECRET: z.string(),

  // URLs
  API_URL: z.url(),
});

export type EnvVarsType = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(import.meta.env);

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
