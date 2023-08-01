using System.ComponentModel.DataAnnotations;

namespace NewJwt.Core.Dtos
{
    public class UpdatePermissionDto
    {
        [Required(ErrorMessage = "UserName is required")]
        public string Username { get; set; }
    }
}
