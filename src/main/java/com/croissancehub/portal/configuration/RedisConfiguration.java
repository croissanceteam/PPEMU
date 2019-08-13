package com.croissancehub.portal.configuration;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

import javassist.expr.NewArray;

@EnableCaching
@Configuration
public class RedisConfiguration {

	@Bean
	public JedisConnectionFactory redisConnectionFactory() {
		RedisStandaloneConfiguration configuration=new RedisStandaloneConfiguration("192.168.1.150",6379);
		return new JedisConnectionFactory(configuration);
	}
	public CacheManager redisCacheManager() {
		return RedisCacheManager.create(redisConnectionFactory());
	}
}
