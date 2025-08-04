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
    }
}
