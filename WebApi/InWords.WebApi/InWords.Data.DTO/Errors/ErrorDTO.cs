using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.DTO.Errors
{
    public class ErrorDTO
    {
        public string Code { get; set; }

        public string Message { get; set; }

        public string InnerError { get; set; }
    }
}
