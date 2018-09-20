﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using Microsoft.AspNetCore.Authorization;
using InWords.Data;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository usersRepository;

        public UsersController()
        {
            usersRepository = new UserRepository(new InWordsDataContext());
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return usersRepository.Get();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserID)
            {
                return BadRequest();
            }

            try
            {
                await usersRepository.Update(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (user.UserID != 0)
                return BadRequest("@POST User with  userID = 0 to add or use @PUT to Update");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await usersRepository.Create(user);

            return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
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

            usersRepository.Remove(user);
            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return usersRepository.ExistAny(e => e.UserID == id);
        }
    }
}