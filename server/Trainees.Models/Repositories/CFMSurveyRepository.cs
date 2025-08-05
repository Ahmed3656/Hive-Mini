using System.Collections.Generic;
using Trainees.Models.Interfaces.RepositoryInterfaces;
using  Trainees.Models.Models;
using  Trainees.Models.Repositories.Base;
using System.Data.Entity;
using System.Linq;

namespace Trainees.Models.Repositories
{
    public class CFMSurveyRepository : Repository<CFMSurvey>, ICFMSurveyRepository
    {
        public CFMSurveyRepository(TraineeDB_DemoEntities context)
            : base(context)
        {
        }

        public TraineeDB_DemoEntities TraineeDBDemoEntities
        {
            get { return Context as TraineeDB_DemoEntities; }
        }

        public List<CFMSurvey> GetWithUsers()
        {
            return TraineeDBDemoEntities.CFMSurveys
                .Include(s => s.CFMUser)
                .Include(s => s.CFMUser1)
                .ToList();
        }

        public List<CFMSurvey> GetSurveysByOwner(int userId)
        {
            return TraineeDBDemoEntities.CFMSurveys
                .Include(s => s.CFMUser)
                .Include(s => s.CFMUser1)
                .Where(s => s.CreatedBy == userId || s.ModifiedBy == userId)
                .ToList();
        }
    }
}
