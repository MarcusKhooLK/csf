package vttp.csf.server.config;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig {

    private Logger logger = Logger.getLogger(AppConfig.class.getName());

    @Value("${cors.path}")
    String corsPath;

    @Value("${cors.origins}")
    String corsOrigins;

    @Bean
	public WebMvcConfigurer corsConfigurer() {
        logger.info("CORS Path: %s, CORS Origins: %s".formatted(corsPath , corsOrigins));
		return new CORSConfig(corsPath, corsOrigins);
	}
}
