using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.Data.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Create(TEntity item);
        Task<IEnumerable<TEntity>> Create(params TEntity[] item);
        Task<TEntity> FindById(int id);
        IEnumerable<TEntity> GetAllEntities();
        IEnumerable<TEntity> GetWhere(Func<TEntity, bool> predicate);
        Task<int> Remove(params TEntity[] item);
        Task<TEntity> Update(TEntity item);
    }
}