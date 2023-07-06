using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly RegContext _context;
        private readonly IRegistrationService _registrationService;
        public RegistrationController(IRegistrationService registrationService, RegContext context)
        {
            _registrationService = registrationService;
            _context = context; 
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult<List<Registration>>> AddUser([FromBody] Registration reg)
        {
            var result  = _registrationService.AddUser(reg);
            if(result == null)
            {
                return NotFound("Not Found");
            }
            return Ok(result);
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<List<Registration>>> GetData()
        {
            var result = _registrationService.GetUser();
            if (result == null)
            {
                return NotFound("Not Found");
            }
            return Ok(result);
        }
        [HttpPost("Login")]
        public async Task<ActionResult<bool>> Login([FromBody] Login login)
        {

            var result = _registrationService.Login(login);
            if( result == false)
            {
                return NotFound(result);
            }
            return Ok(result);
        }
        [HttpDelete("DeleteUser{id}")]
        public async Task<ActionResult<Message>> DeleteUser(int id)
        {
            Message msg = new Message();
            var result = _registrationService.DeleteUser(id);
            if (result == false)
            {
                msg.Msg = "There is Not Such User";
                return msg;
            }
            msg.Msg = "User is Successfully Deleted";
            return Ok(msg);
        }

        [HttpPut("UpdateUser{id}")]
        public async Task<ActionResult<Message>> UpdateUser([FromBody] Registration registration,int id)
        {
            Message msg = new Message(); 
            var result = _context.Registrations.FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                msg.Msg = "There is not user at such id ";
                return msg;
            }

            result.UserName = registration.UserName;
            result.Email = registration.Email;
            result.Password = registration.Password;
            result.PasswordCheck = registration.PasswordCheck;
            _context.SaveChanges();
            msg.Msg = "User Successfully Updated";
            return Ok(msg);
        }
    }
}
