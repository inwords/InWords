﻿using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    /// <inheritdoc />
    /// <summary>
    ///     Everything about user
    /// </summary>
    [Authorize]
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    public class UsersController : ControllerBase
    {
        /// <summary>
        ///     Get user by nickname
        /// </summary>
        /// <returns>list of users like nickname</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        [ProducesResponseType(typeof(IEnumerable<User>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet("find/{nick}")]
        public IActionResult GetUsers(string nick)
        {
            return Ok(userService.GetUsers(nick));
        }

        /// <summary>
        ///     Get user by id
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404">User not found</response>
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserId([FromRoute] int id)
        {
            User user = await usersRepository.FindById(id);

            if (user == null) return NotFound();

            return Ok(user);
        }

        /// <summary>
        ///     Get authorized user information
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404"></response>
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        public IActionResult GetUser()
        {
            int userId = User.GetUserId();
#warning Security warning change User.Account to UserDTO
            User user = usersRepository.GetUserAccount(userId);

            if (user == null) return NotFound();

            return Ok(user);
        }


        /// <summary>
        ///     Update an existing user
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="400">Model is not valid</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404"></response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut]
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            int authorizedId = User.GetUserId();

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

        /// <summary>
        ///     Administratively delete user
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="204">The user is successfully deleted</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Access for administrations only</response>
        /// <response code="404">User not found</response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public async Task<IActionResult> AdminDeleteUser([FromRoute] int id)
        {
            Account account = await accountRepository.FindById(id);

            if (account == null) return NotFound();

            await accountRepository.Remove(account);
            return NoContent();
        }

        #region ctor

        private readonly AccountRepository accountRepository;
        private readonly UserService userService;
        private readonly UserRepository usersRepository;

        public UsersController(AccountRepository accountRepository, UserService userService,
            UserRepository usersRepository)
        {
            this.userService = userService;

            // TODO: remove
            this.usersRepository = usersRepository;
            this.accountRepository = accountRepository;
        }

        #endregion
    }
}