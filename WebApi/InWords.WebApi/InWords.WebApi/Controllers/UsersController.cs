using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using Microsoft.AspNetCore.Authorization;
using InWords.Data;
using InWords.Data.Enums;
using System.Security.Claims;
using System.Linq;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository usersRepository;
        private readonly AccountRepository accauntRepositoty;


        public UsersController()
        {
            var dataContext = new InWordsDataContext();
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
        [Authorize]
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            // todo check claims exist
            var nameIdentifier = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).First();
            var authorizedID = int.Parse(nameIdentifier.Value);

            /// Authorized
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var authorizedAccaund = await accauntRepositoty.FindById(authorizedID);

                if (authorizedAccaund == null)
                {
                    return BadRequest("User doesn't exist. Send this problem to admin");
                }

                // UpdateNickname
                if (user.NickName != null)
                {
                    authorizedAccaund.User.NickName = user.NickName;
                }

                //Update uri
                if (user.AvatarPath != null)
                {
                    authorizedAccaund.User.NickName = user.NickName;
                }
                await accauntRepositoty.Update(authorizedAccaund);
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

            accauntRepositoty.Remove(accaunt);
            return Ok(accaunt);
        }

        private bool UserExists(int id)
        {
            return usersRepository.ExistAny(e => e.UserID == id);
        }
    }
}