using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IRegistrationService
    {
        Task<List<Registration>> AddUser(Registration registration);
        Task<List<Registration>> GetUser();
        bool Login(Login login);
        bool DeleteUser(int id);
    }
}
