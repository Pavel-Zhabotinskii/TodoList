using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NewJwt.Core.Dtos;
using NewJwt.Core.Entities;
using NewJwt.Core.interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NewJwt.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager,IConfiguration configuration) 
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<AuthServiceResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user is null) return new AuthServiceResponseDto(){isSucceed = false, Message = "Invalid Credentils"}; 

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordCorrect) return new AuthServiceResponseDto() { isSucceed = false, Message = "Invalid Credentils" };

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("JWTID", Guid.NewGuid().ToString())
            };

            var token = GenerateNewJsonWebToken(authClaims);

            return new AuthServiceResponseDto() { isSucceed = true, Message = token, User = user};
        }

        public async Task<AuthServiceResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isExistsUser = await _userManager.FindByNameAsync(registerDto.Username);

            if (isExistsUser != null) 
                return new AuthServiceResponseDto()
                {
                    isSucceed = false,
                    Message = "UserName Alredy Exists"
                };

            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!createUserResult.Succeeded)
            {
                var errorStrihg = "User Creation Failed Because: ";
                foreach (var error in createUserResult.Errors)
                {
                    errorStrihg += " # " + error.Description;
                }
                return new AuthServiceResponseDto()
                {
                    isSucceed = false,
                    Message = errorStrihg
                };
            }

            return new AuthServiceResponseDto()
            {
                isSucceed = true,
                Message = "User Created Successfully",
                User = newUser
            };
        }

        private string GenerateNewJsonWebToken(List<Claim> claims)
        {
            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenObject = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(1),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);

            return token;
        }
    }
}
