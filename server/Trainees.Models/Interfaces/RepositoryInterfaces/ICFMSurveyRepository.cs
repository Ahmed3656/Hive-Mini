using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;

namespace Trainees.Models.Interfaces.RepositoryInterfaces
{
    public interface ICFMSurveyRepository : IRepository<CFMSurvey>
    {
        List<CFMSurvey> GetWithUsers();
        List<CFMSurvey> GetSurveysByOwner(int userId);
        IEnumerable<CFMSurvey> Find(Expression<Func<CFMSurvey, bool>> predicate);
    }
}
