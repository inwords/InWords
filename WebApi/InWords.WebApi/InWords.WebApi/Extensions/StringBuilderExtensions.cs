using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class StringBuilderExtensions
    {
        public static void AppendLineIfExist(this StringBuilder builder, string content, string description = null)
        {
            if (string.IsNullOrEmpty(content)) return;

            if (!string.IsNullOrEmpty(description))
            {
                content = $"{description}: {content}";
            }

            builder.AppendLine(content);
        }
    }
}
