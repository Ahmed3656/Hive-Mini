using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Trainees.Models.Interfaces.Base
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(int id);
        IEnumerable<TEntity> GetAll();
        void AddOrUpdate(TEntity entity);
        void Add(TEntity entity);
        void Update(TEntity entityInDb, TEntity updatedEntity);
        void Delete(Expression<Func<TEntity, bool>> predicate);
    }
}
