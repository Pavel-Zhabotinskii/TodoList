using Microsoft.AspNetCore.Identity;

namespace NewJwt.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<Todo> Tasks { get; set; }
    }
}
