class AppConfig {
    public usersUrl = 'http://localhost:8080/api/users';
    public AdminUrl = 'http://localhost:8080/api/role';
    public followersUrl = 'http://localhost:8080/api/followers';
    public vacationsUrl = 'http://localhost:8080/api/vacations';
    public signupUrl = 'http://localhost:8080/api/register';
    public loginUrl = 'http://localhost:8080/api/login';
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 6000;
}

const appConfig = new AppConfig();
export default appConfig;