using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class RegistrationService : IRegistrationService
    {
        private readonly RegContext _regContext;
        public RegistrationService(RegContext regContext)
        {
            _regContext = regContext;
        }
        
        public async Task<List<Registration>> AddUser([FromBody]Registration registration)
        {
            _regContext.Registrations.Add(registration);
            _regContext.SaveChanges();
            var result = _regContext.Registrations.ToList();
            return result;
        }

        public  async Task<List<Registration>> GetUser()
        {
            var usersData = _regContext.Registrations.ToList();
            return usersData;
        }

        public  bool Login(Login login)
        {
            var checkUserName = _regContext.Registrations.FirstOrDefault(x => x.UserName == login.UserName && x.Password == login.Password);
            if (checkUserName == null)
            {
                return false;
            }
            return true;
        }

        public bool DeleteUser(int id)
        {
            var deleteUser = _regContext.Registrations.FirstOrDefault(x=>x.Id == id);
            if (deleteUser == null)
            {
                return false;
            }
            _regContext.Registrations.Remove(deleteUser);
            _regContext.SaveChanges();
            return true;
        }
    }
}
