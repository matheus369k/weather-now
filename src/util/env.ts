import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NEXT_PUBLIC_GEOLOCATION_API_URL: z.string().url(),
  NEXT_PUBLIC_WEATHER_API_URL: z.string().url(),
  NEXT_PUBLIC_COUNTRY_FLAGS_API_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
