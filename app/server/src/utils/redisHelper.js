// utils/redisHelper.js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export class RedisCache {
    constructor(prefix = "route:", defaultTTL = 3600) {
        this.prefix = prefix;
        this.defaultTTL = defaultTTL;
    }

    async get(key) {
        try {
            const data = await redis.get(`${this.prefix}${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Redis get error:", error);
            return null;
        }
    }

    async set(key, value, ttl = this.defaultTTL) {
        try {
            await redis.setex(`${this.prefix}${key}`, ttl, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Redis set error:", error);
            return false;
        }
    }

    async del(key) {
        try {
            await redis.del(`${this.prefix}${key}`);
            return true;
        } catch (error) {
            console.error("Redis del error:", error);
            return false;
        }
    }

    async clearPattern(pattern) {
        try {
            const keys = await redis.keys(`${this.prefix}${pattern}`);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
            return true;
        } catch (error) {
            console.error("Redis clear error:", error);
            return false;
        }
    }
}

export const routeCache = new RedisCache("route:");
export const trafficCache = new RedisCache("traffic:", 1800); // 30 min TTL

export default redis;
