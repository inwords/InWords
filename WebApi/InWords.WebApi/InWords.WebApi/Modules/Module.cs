using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules
{
    /// <summary>
    ///    This is to improve project infrastructure using reflection
    ///    and file segragation
    /// </summary>
    public abstract class Module
    {

        /// <summary>
        ///    This is to segregate Ioc configuration layer from startup class
        /// </summary>
        public abstract void ConfigureIoc();

        // Service

        // Repository

        // Api
    }
}
