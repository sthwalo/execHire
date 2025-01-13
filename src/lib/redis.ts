import { Redis } from 'ioredis';
import { Vehicle } from '@/src/types';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// Cache TTL in seconds
const DEFAULT_TTL = 3600; // 1 hour

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function cacheSet<T>(
  key: string,
  data: T,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  await redis.setex(key, ttl, JSON.stringify(data));
}

export async function cacheDelete(key: string): Promise<void> {
  await redis.del(key);
}

// Vehicle-specific cache functions
export async function getCachedVehicle(id: string): Promise<Vehicle | null> {
  return cacheGet<Vehicle>(`vehicle:${id}`);
}

export async function setCachedVehicle(
  vehicle: Vehicle,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  await cacheSet(`vehicle:${vehicle.id}`, vehicle, ttl);
}

export async function invalidateVehicleCache(id: string): Promise<void> {
  await cacheDelete(`vehicle:${id}`);
}

// Pattern-based cache invalidation
export async function invalidateByPattern(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
