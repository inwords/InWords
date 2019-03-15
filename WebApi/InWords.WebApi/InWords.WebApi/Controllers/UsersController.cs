using InWords.Auth.Extentions;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;

namespace InWords.WebApi.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using InWords.Data;
    using InWords.Data.Enums;
    using InWords.Auth;
    using InWords.WebApi.Service;

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository usersRepository = null;
        private readonly AccountRepository accauntRepositoty = null;
        private readonly UserService userService = null;

        public UsersController(InWordsDataContext context)
        {
            var dataContext = context;
            userService = new UserService(dataContext);

            // TODO: remove
            usersRepository = new UserRepository(dataContext);
            accauntRepositoty = new AccountRepository(dataContext);
        }

        // GET: api/Users/
        [HttpGet("find/{nick}")]
        public IEnumerable<User> GetUsers(string nick)
        {
            return userService.GetUsers(nick);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await usersRepository.FindById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET: api/Users/ 
        // return authorized user data
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var userID = User.Claims.GetUserId();

            var user = await usersRepository.FindById(userID);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        // PUT: api/Users
        [HttpPut]
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            int authorizedID = User.Claims.GetUserId();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // check is user exist
            var authorizedUser = await usersRepository.FindById(authorizedID);

            if (authorizedUser == null)
            {
                return NotFound("User doesn't exist. Send this problem to admin");
            }

            // UpdateNickname
            if (user.NickName != null)
            {
                authorizedUser.NickName = user.NickName;
            }

            // Update avatar
            if (user.AvatarPath != null)
            {
                authorizedUser.AvatarPath = user.AvatarPath;
            }

            await usersRepository.Update(authorizedUser);

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public async Task<IActionResult> AdminDeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var accaunt = await accauntRepositoty.FindById(id);
            if (accaunt == null)
            {
                return NotFound();
            }

            await accauntRepositoty.Remove(accaunt);
            return Ok(accaunt);
        }

        private bool UserExists(int id)
        {
            return usersRepository.ExistAny(e => e.UserId == id);
        }
    }
}