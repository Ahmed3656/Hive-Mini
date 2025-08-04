using BCrypt.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using  Trainees.Models.Interfaces.RepositoryInterfaces;
using  Trainees.Models.Models;
using  Trainees.Models.Repositories.Base;

namespace  Trainees.Models.Repositories
{
    public class CFMUserRepository : Repository<CFMUser>, ICFMUserRepository
    {
        public CFMUserRepository(TraineeDB_DemoEntities context)
            : base(context)
        {
        }

        public CFMUser Login(string username, string password)
        {
            var user = Context.Set<CFMUser>()
                             .FirstOrDefault(u => u.Username == username);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }

            return null;
        }

        public IEnumerable<CFMUser> Find(Expression<Func<CFMUser, bool>> predicate)
        {
            return Context.Set<CFMUser>().Where(predicate).ToList();
        }

    }
}
