using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;

namespace Trainees.Models.Interfaces.RepositoryInterfaces
{
    public interface ICFMUserRepository : IRepository<CFMUser>
    {
        CFMUser Login(string username, string password);

        IEnumerable<CFMUser> Find(Expression<Func<CFMUser, bool>> predicate);
    }
}
