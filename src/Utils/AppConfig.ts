/**
 * Configuration class for managing application settings.
 * This class provides the base structure for different environment-specific configurations.
 */
class AppConfig{
    
}

/**
 * Configuration class for development environment.
 *  * Inherits from AppConfig
 */
class DevAppConfig extends AppConfig{
    public url = "http://localhost:8080";
}


/**
 * Configuration class for test environment.
 * Inherits from AppConfig
 */
class TestAppConfig extends AppConfig{
    public url = "http://localhost:8080";
    
}

/**
 * Configuration class for production environment.
 * Inherits from AppConfig
 */
class ProdAppConfig extends AppConfig{
    public url = "http://localhost:8080";
}

/**
 *  Environment-specific AppConfig instance based on the NODE_ENV environment variable.
 */
 
const appConfig = process.env.NODE_ENV === "development" ? new DevAppConfig() : 
    process.env.NODE_ENV ==="test" ? new TestAppConfig() : new ProdAppConfig()

/**
 * Export the environment-specific AppConfig instance.
 */
export default appConfig;