using NewJwt.Core.Dtos;
using NewJwt.Core.Entities;

namespace NewJwt.Core.interfaces
{
    public interface ITaskService
    {
        public Task<string> CreateAsync(TaskDto taskDto);
        public Task<List<Todo>> GetTodoListAsync();
        public Task<string> UpdateTaskAsync(TaskDto task);
        public Task<string> DeleteTaskAsync(int id);
    }
}
