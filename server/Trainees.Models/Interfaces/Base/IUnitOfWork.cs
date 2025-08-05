using  Trainees.Models.Interfaces.RepositoryInterfaces;
using System;

namespace  Trainees.Models.Interfaces.Base
{
    public interface IUnitOfWork : IDisposable
    {
        ICFMUserRepository CFMUsers { get; }
        ICFMSurveyRepository CFMSurveys { get; }

        int Complete();
        string GetConnectionString();
    }
}
