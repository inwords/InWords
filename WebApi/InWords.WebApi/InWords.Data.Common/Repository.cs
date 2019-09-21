using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using InWords.Abstractions.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InWords.Abstractions
{
    public class Repository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DbContext context;

        protected readonly DbSet<TEntity> DbSet;

        public Repository(DbContext context)
        {
            this.context = context;
            DbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> Create(TEntity item)
        {
            await DbSet.AddAsync(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<TEntity[]> Create(params TEntity[] items)
        {
            await DbSet.AddRangeAsync(items);
            await context.SaveChangesAsync();
            return items;
        }

        public async Task<TEntity> FindById(params object[] id)
        {
            return await DbSet.FindAsync(id);
        }

        public IEnumerable<TEntity> GetAllEntities()
        {
            return DbSet.AsNoTracking().AsEnumerable();
        }

        public IEnumerable<TEntity> GetWhere(Func<TEntity, bool> predicate)
        {
            return DbSet.AsNoTracking().AsEnumerable().Where(predicate).ToList();
        }

        /// <summary>
        ///     Async remove from DataBase
        /// </summary>
        /// <param name="item"></param>
        public async Task<int> Remove(params TEntity[] item)
        {
            foreach (TEntity currentItem in item) context.Entry(currentItem).State = EntityState.Deleted;
            return await context.SaveChangesAsync();
        }

        public async Task<int> RemoveAt(params int[] Ids)
        {
            List<TEntity> list = new List<TEntity>();
            foreach (int id in Ids)
            {
                list.Add(await DbSet.FindAsync(id));
            }
            return await Remove(list.ToArray());
        }

        public async Task<TEntity> Update(TEntity item)
        {
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return item;
        }
        public async Task<IEnumerable<TEntity>> Update(IEnumerable<TEntity> items)
        {
            foreach (TEntity item in items)
            {
                context.Entry(item).State = EntityState.Modified;
            }
            await context.SaveChangesAsync();
            return items;
        }
        public async Task<TEntity[]> Update(params TEntity[] items)
        {
            await Update(items);
            return items;
        }

        public async Task<int> Delete(Expression<Func<TEntity, bool>> predicate)
        {
            DbSet.RemoveRange(DbSet.Where(predicate));
            return await context.SaveChangesAsync();
        }

        /// <summary>
        ///     Creates an entity or returns if it exists
        /// </summary>
        /// <param name="item"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public async Task<TEntity> Stack(TEntity item, Func<TEntity, bool> predicate)
        {
            TEntity entity = GetWhere(predicate).SingleOrDefault();

            entity = entity ?? await Create(item);

            return entity;
        }

        public bool ExistAny(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Any(predicate);
        }

        #region Include

        /// <summary>
        ///     Example: IEnumerable phones = phoneRepo.GetWithInclude(x=>x.Company.Name.StartsWith("S"), p=>p.Company);
        /// </summary>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        public IEnumerable<TEntity> GetWithInclude(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return Include(includeProperties).ToList();
        }

        public IEnumerable<TEntity> GetWithInclude(Func<TEntity, bool> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IEnumerable<TEntity> query = Include(includeProperties);
            return query.AsEnumerable().Where(predicate).ToList();
        }

        private IEnumerable<TEntity> Include(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = DbSet.AsNoTracking();
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }
        #endregion
    }
}