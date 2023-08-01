using NewJwt.Core.Entities;

namespace NewJwt.Core.Dtos
{
    public class AuthServiceResponseDto
    {
        public bool isSucceed { get; set; }
        public string Message { get; set; }
        public ApplicationUser User { get; set; } = null;
    }
}
