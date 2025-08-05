using Trainees.Models.Interfaces.Base;
using Trainees.Models.Interfaces.RepositoryInterfaces;
using Trainees.Models.Models;
using Trainees.Models.Repositories;

namespace Trainees.Models.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TraineeDB_DemoEntities _context;

        public UnitOfWork(TraineeDB_DemoEntities context)
        {
            _context = context;
            CFMUsers = new CFMUserRepository(_context);
            CFMSurveys = new CFMSurveyRepository(_context);
        }

        #region repositories
        public ICFMUserRepository CFMUsers { get; private set; }
        public ICFMSurveyRepository CFMSurveys { get; private set; }
        #endregion

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public string GetConnectionString()
        {
            return _context.Database.Connection.ConnectionString;
        }
    }
}
