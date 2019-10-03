using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InWords.Abstractions.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> CreateAsync(TEntity item);
        Task<TEntity[]> Create(params TEntity[] item);
        Task<TEntity> FindById(params object[] id);
        IEnumerable<TEntity> GetAllEntities();
        IEnumerable<TEntity> GetWhere(Func<TEntity, bool> predicate);
        Task<int> Remove(params TEntity[] item);
        Task<TEntity> Update(TEntity item);
        Task<int> Delete(Expression<Func<TEntity, bool>> predicate);
    }
}