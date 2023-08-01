using System.ComponentModel.DataAnnotations;

namespace NewJwt.Core.Entities
{
    public class Todo
    {
        public int id { get; set; }
        public string description { get; set; }
        public bool isCompleted { get; set; }
        public ApplicationUser user { get; set; }
        public string userId { get; set; }
    }
}
