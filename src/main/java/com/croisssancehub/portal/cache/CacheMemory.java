package com.croisssancehub.portal.cache;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

/**
 * CachMemory
 */
@EnableCaching
@Configuration
public class CacheMemory {

    //@ConditionalOnBean
    @Bean
    public JedisConnectionFactory redisConnectionFactory(){
        RedisStandaloneConfiguration configuration=new RedisStandaloneConfiguration
        (
            "localhost",6379
        );
        return new JedisConnectionFactory(configuration);
    }
    
    @Bean
    public CacheManager redisCacheManager(){
        return RedisCacheManager.create(this.redisConnectionFactory());
    }
}