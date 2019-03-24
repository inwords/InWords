using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Auth.Extensions;
using InWords.Data.Enums;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.Native
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly AccountRepository accountRepository;
        private readonly UserService userService;
        private readonly UserRepository usersRepository;

        public UsersController(InWordsDataContext context)
        {
            InWordsDataContext dataContext = context;
            userService = new UserService(dataContext);

            // TODO: remove
            usersRepository = new UserRepository(dataContext);
            accountRepository = new AccountRepository(dataContext);
        }

        // GET: api/Users/
        [HttpGet("find/{nick}")]
        public IEnumerable<User> GetUsers(string nick)
        {
            return userService.GetUsers(nick);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserId([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            User user = await usersRepository.FindById(id);

            if (user == null) return NotFound();

            return Ok(user);
        }

        // GET: api/Users/ 
        // return authorized user data
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            int userId = User.Claims.GetUserId();

            User user = await usersRepository.FindById(userId);

            if (user == null) return NotFound();

            return Ok(user);
        }


        // PUT: api/Users
        [HttpPut]
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            int authorizedId = User.Claims.GetUserId();

            if (!ModelState.IsValid) return BadRequest(ModelState);

            // check is user exist
            User authorizedUser = await usersRepository.FindById(authorizedId);

            if (authorizedUser == null) return NotFound("User doesn't exist. Send this problem to admin");

            // UpdateNickname
            if (user.NickName != null) authorizedUser.NickName = user.NickName;

            // Update avatar
            if (user.AvatarPath != null) authorizedUser.AvatarPath = user.AvatarPath;

            await usersRepository.Update(authorizedUser);

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public async Task<IActionResult> AdminDeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            Account account = await accountRepository.FindById(id);
            if (account == null) return NotFound();

            await accountRepository.Remove(account);
            return Ok(account);
        }
    }
}