namespace InWords.WebApi.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using InWords.Data.Models;
    using Microsoft.AspNetCore.Authorization;
    using InWords.Data;
    using InWords.Data.Enums;
    using System.Linq;
    using InWords.Auth;

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository usersRepository;
        private readonly AccountRepository accauntRepositoty;

        public UsersController(InWordsDataContext context)
        {
            var dataContext = context;
            usersRepository = new UserRepository(dataContext);
            accauntRepositoty = new AccountRepository(dataContext);
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return usersRepository.Get().Take(50);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
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

        // PUT: api/Users/5
        [HttpPut]
        [Authorize]//User
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            int authorizedID = User.Claims.GetUserID();

            /// Authorized
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                //one to one return null?
                var authorizedUser = await usersRepository.FindById(authorizedID);

                if (authorizedUser == null)
                {
                    return BadRequest("User doesn't exist. Send this problem to admin");
                }

                // UpdateNickname
                if (user.NickName != null)
                {
                    authorizedUser.NickName = user.NickName;
                }

                //Update uri
                if (user.AvatarPath != null)
                {
                    authorizedUser.AvatarPath = user.AvatarPath;
                }

                await usersRepository.Update(authorizedUser);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(authorizedID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

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
            return usersRepository.ExistAny(e => e.UserID == id);
        }
    }
}