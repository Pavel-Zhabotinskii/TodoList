using NewJwt.Core.Dtos;

namespace NewJwt.Core.interfaces
{
    public interface IAuthService
    {
        Task<AuthServiceResponseDto> RegisterAsync(RegisterDto registerDto);

        Task<AuthServiceResponseDto> LoginAsync(LoginDto loginDto);
    }
}
