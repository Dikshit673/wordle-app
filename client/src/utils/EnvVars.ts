import z from 'zod';

export const envSchema = z.object({
  // Application settings
  VITE_NODE_ENV: z.enum(['development', 'production']).default('production'),

  // encryption keys
  VITE_WORD_SECRET: z.string(),

  // HMAC
  VITE_HMAC_SECRET: z.string(),

  // URLs
  VITE_API_URL: z.url(),
});

export type EnvVarsType = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    z.treeifyError(parsed.error)
  );
  throw new Error('Invalid environment variables');
}

const _env = parsed.data;

const IS_DEV = _env.VITE_NODE_ENV === 'development';

const EnvVars = { ..._env, IS_DEV };

export { EnvVars };
