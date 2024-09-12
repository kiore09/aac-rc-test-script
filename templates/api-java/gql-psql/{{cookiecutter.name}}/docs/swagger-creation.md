# Generating Swagger Documentation

This template uses the `springdoc-openapi-starter-webmvc-ui` and `springdoc-openapi-starter-webmvc-api` library - provided by the [Springdoc-openapi project](https://github.com/springdoc/springdoc-openapi) - to generate OpenAPI 3.0
documentation.
- The [Swagger Configuration Class](../src/main/java/com/telus/samples/config/SwaggerConfig.java) sets most of the "upper level" properties for the Swagger UI, such as the title, description, and version of the API.
- Swagger annotations are used to provide information about endpoints and model definitions - see
[DemoApiController.java](../src/main/java/com/telus/samples/api/DemoApiController.java) and [User.java](../src/main/java/com/telus/samples/api/User.java) for examples
- The Swagger JSON file can be generated and updated by executing the unit test in [GenerateSwagger.java](../src/test/java/swagger/GenerateSwagger.java) (by default, the Swagger file
is written to [`api/example.oas3.json`](../api/example.oas3.json).) The test can be executed in Maven with the following command:
```
mvn test -Dtest=GenerateSwagger
```
> [!NOTE]  
> We have included an example of Swagger 2.0 JSON file [example.oas2.json](../api/example.oas2.json) as reference if you would like to use Swagger 2.0 instead of OpenAPI 3.0. Unfortunately the Swagger 2.0 JSON file is not generated automatically and needs to be updated manually. Swagger UI and endpoint `v2/api-docs` also doesn't support the Swagger 2.0 file.

# Swagger endpoints
The following endpoints are available and can be customized or disabled:
- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- Swagger JSON for all endpoint in repository: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## Grouped endpoints
This is an example GroupedOpenApi or group definition for the 'user' group. The paths included in this group are '/user/*' and '/users'. The OpenAPI documentation for this group will be available at [http://localhost:8080/v3/api-docs/user](http://localhost:8080/v3/api-docs/user)


```
import org.springdoc.core.models.GroupedOpenApi;

    @Bean
    GroupedOpenApi userOpenApi() {
      String paths[] = {"/user/*", "/users"};
      return GroupedOpenApi.builder()
          .group("user")
          .pathsToMatch(paths)
          .build();
    };
```

For more information on the Swagger UI, see the [Springdoc-openapi Project](https://github.com/springdoc/springdoc-openapi) or [Springdoc.org](https://springdoc.org/).

