package com.champ.book.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Parth",
                        email = "trivediparth20000@gmail.com",
                        url = "https://www.champ.com"
                ),
                description = "OpenApi documentation for Spring Security",
                title = "OpenApi Specifications - champ",
                version = "1.0",
                license = @License(
                        name = "License name",
                        url = "https://some-url.com"
                ),
                termsOfService = "Terms of Service"
        ),
        servers = {
                @Server( // DEV env
                description = "Local ENV",
                url = "http://localhost:8088/api/v1"
                ),
                @Server( // PROD env
                        description = "Prod ENV",
                        url = "https://champcoding.com/projects"
                )
                // you can add so many servers description for your use cases.
                },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT Auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
