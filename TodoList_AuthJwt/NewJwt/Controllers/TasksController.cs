using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewJwt.Core.Dtos;
using NewJwt.Core.Entities;
using NewJwt.Core.interfaces;

namespace NewJwt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        [Route("get-todo-list")]
        public async Task<IActionResult> GetTodoList()
        {
            var todoList = await _taskService.GetTodoListAsync();
            return Ok(todoList);
        }

        [HttpPost]
        [Route("create-task")]
        public async Task<IActionResult> CreateAsync([FromBody]TaskDto taskDto)
        {
            string todo = await _taskService.CreateAsync(taskDto);
            return Ok(todo);
        }

        [HttpPut]
        [Route("update-task")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskDto task)
        {
            string newTask = await _taskService.UpdateTaskAsync(task);
            return Ok(newTask);
        }

        [HttpDelete]
        [Route("delete-task")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            string task = await _taskService.DeleteTaskAsync(id);
            return Ok(task);
        }
    }
}
