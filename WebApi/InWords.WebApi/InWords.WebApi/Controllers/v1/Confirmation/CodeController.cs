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
    public class CodeController : ControllerBase
    {
        public CodeController()
        {
            
        }
    }
}
