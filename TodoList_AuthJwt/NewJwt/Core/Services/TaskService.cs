using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewJwt.Core.DbContext;
using NewJwt.Core.Dtos;
using NewJwt.Core.Entities;
using NewJwt.Core.interfaces;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace NewJwt.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _dataRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public TaskService(ApplicationDbContext dataRepository, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor = null)
        {
            _dataRepository = dataRepository;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> CreateAsync(TaskDto taskDto)
        {
            var user = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            Todo task = new()
            {
                description = taskDto.description,
                isCompleted = taskDto.isCompleted,
                user = user,
                userId = userId
            };
            _dataRepository.Tasks.Add(task);
            _dataRepository.SaveChanges();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(task, options);
            return json;
        }

        public async Task<List<Todo>> GetTodoListAsync()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var toloList = await _dataRepository.Tasks.Where(t => t.userId == userId).ToListAsync();
            return toloList;
        }

        public async Task<string> UpdateTaskAsync(TaskDto task)
        {
            var existingTask = await _dataRepository.Tasks.FirstOrDefaultAsync(t => t.id == task.id);
            existingTask.description = task.description;
            existingTask.isCompleted = task.isCompleted;
            _dataRepository.Tasks.Update(existingTask);
            await _dataRepository.SaveChangesAsync();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(existingTask, options);
            return json;
        }

        public async Task<string> DeleteTaskAsync(int id)
        {
            Console.WriteLine(11111111111);
            var task = await _dataRepository.Tasks.FirstOrDefaultAsync(t => t.id == id);

            _dataRepository.Tasks.Remove(task);
            _dataRepository.SaveChanges();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(task, options);
            return json;
        }
    }
}

