using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.Models.Repositories
{
    public static class UserRepositoryInstance
    {
        public static UserRepository Data;

        static UserRepositoryInstance()
        {
            Data = new UserRepository();
        }
    }
}
