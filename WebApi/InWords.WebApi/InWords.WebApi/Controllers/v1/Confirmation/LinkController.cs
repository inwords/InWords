using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.Confirmation
{
    [ApiController]
    [ApiVersion("1.0")]
    [Produces("application/json")]
    [Route("v{version:apiVersion}/[controller]")]
    public class LinkController : ControllerBase
    {
        [HttpGet]
        [Route("Confirm/{encryptlink}")]
        public async Task<IActionResult> ConfirmLink(string encryptlink)
        {
            //    int authorizedId = User.GetUserId();

            //    try
            //    {
            //        await emailVerifierService.IsLinkCorrect(encryptlink);
            //        await accountRepository.SetEmail(authorizedId, emailClaims.Email);
            //        return NoContent();
            //    }
            //    catch (ArgumentException e)
            //    {
            //        return StatusCode(StatusCodes.Status422UnprocessableEntity, "Email code is incorrect");
            //    }
            //    catch (TimeoutException e)
            //    {
            //        return StatusCode(StatusCodes.Status403Forbidden, "Too many attempts for email activation");
            //    }
            //}
            throw new NotImplementedException();
        }
    }
}
