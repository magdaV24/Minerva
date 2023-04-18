using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseAPIController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly MinervaContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, MinervaContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                UserID = user.Id
            };
        }

        [HttpPost("register")]

        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User{UserName = registerDTO.Username, Email = registerDTO.Email};

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "User");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]

        public async Task<ActionResult<UserDTO>> SetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                UserID = user.Id,
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {   
            return await _context.Users.FindAsync(id); 
        }
    }
}