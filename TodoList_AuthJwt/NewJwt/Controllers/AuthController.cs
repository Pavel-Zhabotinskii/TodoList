using Microsoft.AspNetCore.Mvc;
using NewJwt.Core.Dtos;
using NewJwt.Core.interfaces;

namespace NewJwt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //Route -> Register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult = await _authService.RegisterAsync(registerDto);

            if(registerResult.isSucceed) return Ok(registerResult);
            
            return BadRequest(registerResult);
        }

        //Route -> Login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);

            if (loginResult.isSucceed) return Ok(loginResult);

            return Unauthorized(loginResult);
        }   
    }
}
