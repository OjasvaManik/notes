package com.notes.backend.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.nio.file.Paths

@Configuration
class WebConfig(
	@Value("\${app.file.storage.path}") private val storagePath: String
) {

	@Bean
	fun corsConfigurer(): WebMvcConfigurer {
		return object : WebMvcConfigurer {

			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**")
					.allowedOrigins(
						"http://localhost:3000",
						"http://100.81.99.8:3000",
						"https://fedora.taildb46c9.ts.net",
						"https://studio.apollographql.com"
					)
					.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
					.allowedHeaders("*")
					.allowCredentials(true)
			}

			override fun addResourceHandlers(registry: ResourceHandlerRegistry) {

				val uploadPath = Paths
					.get("$storagePath/images")
					.toAbsolutePath()
					.toUri()
					.toString()

				registry.addResourceHandler("/uploads/images/**")
					.addResourceLocations(uploadPath)
			}
		}
	}
}
