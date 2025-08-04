using  Trainees.Models.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;

namespace  Trainees.Models.Repositories.Base
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext Context;

        public Repository(DbContext context)
        {
            Context = context;
        }

        public void Add(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }

        public void AddOrUpdate(TEntity entity)
        {
            Context.Set<TEntity>().AddOrUpdate(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().AddRange(entities);
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return Context.Set<TEntity>().Where(predicate);
        }

        public TEntity GetWithNoLock(string coulmnName, string value)
        {
            var str = string.Format("SELECT * FROM {0} WITH (NOLOCK) WHERE {1} = {2}; ", typeof(TEntity).Name, coulmnName, value);
            var result = Context.Database.SqlQuery<TEntity>(str).FirstOrDefault();
            return result;
        }

        public TEntity Get(int id)
        {
            return Context.Set<TEntity>().Find(id);
        }

        public TEntity Get(
           Expression<Func<TEntity, bool>> predicate,
           params Expression<Func<TEntity, object>>[] relatedEntities)
        {
            if (relatedEntities != null)
            {
                return relatedEntities
                    .Aggregate(
                        Context.Set<TEntity>().AsQueryable(),
                        (relatedEntitiesQuery, relatedEntitiy) => relatedEntitiesQuery.Include(relatedEntitiy))
                .FirstOrDefault(predicate);
            }

            return Context.Set<TEntity>().FirstOrDefault(predicate);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        public void Update(TEntity entityInDb, TEntity updatedEntity)
        {
            var entry = Context.Entry(entityInDb);
            entry.CurrentValues.SetValues(updatedEntity);
        }

        public void Reload(TEntity entity)
        {
            Context.Entry(entity).Reload();
        }

        public void Delete(Expression<Func<TEntity, bool>> predicate)
        {
            var entitiesToDelete = Context.Set<TEntity>().Where(predicate).ToList();
            Context.Set<TEntity>().RemoveRange(entitiesToDelete);
        }
    }
}
