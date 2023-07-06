using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Login
    {
        public string UserName { get; set; }

        [StringLength(16,MinimumLength =8,ErrorMessage ="Nees To Be In Length Of 8 And 16")]
        public string Password { get; set; }
    }
}
