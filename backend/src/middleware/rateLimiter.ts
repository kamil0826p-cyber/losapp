import rateLimit, { type Options } from 'express-rate-limit'

/**
 * Creates a rate limiter middleware with default configuration
 */
export const createRateLimiter = (config: Partial<Options>) => {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests. Please try again later.' },
    ...config,
  })
}
