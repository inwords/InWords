using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/auth")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator mediator;

        public AuthController(IMediator mediator) => this.mediator = mediator;
        /// <summary>
        ///   Used to add words to the user's dictionary.
        ///   The (localId) value should be zero (0) if you don't need to track words.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("oauth2")]
        [HttpPost]
        public async Task<IActionResult> OAuth2([FromBody] OAuthTokenRequest request)
            => await mediator.AuthorizeHandlerActionResult<OAuthTokenRequest, TokenReply>(request, User).ConfigureAwait(false);

        /// <summary>
        /// Basic access authentication using login, password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("basic")]
        [HttpPost]
        public async Task<IActionResult> Basic([FromBody] TokenRequest request)
            => await mediator.AuthorizeHandlerActionResult<TokenRequest, TokenReply>(request, User).ConfigureAwait(false);

        /// <summary>
        /// Registering a new user and sending them an email
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
            => await mediator.AuthorizeHandlerActionResult<RegistrationRequest, TokenReply>(request, User).ConfigureAwait(false);
    }
}