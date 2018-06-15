using Newtonsoft.Json;
using PendingListBackend.Models;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PendingListBackend.Controllers
{
#if DEBUG
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
#else
    [EnableCors(origins: "https://mytodos.visualstudio.com", headers: "*", methods: "*")]
#endif
    public class ToDoController : ApiController
    {
        private ApplicationDbContext _context;

        public ToDoController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] ToDoItem obj)
        {

            var response = Request.CreateResponse(Ok());
            if (obj == null)
            {
                response = Request.CreateResponse(BadRequest());
                return response;
            }
            var items = _context.ToDoItems.ToList();

            var item = new ToDoItem
            {
                Comment = obj.Comment,
                IsComplete = obj.IsComplete
            };

            _context.ToDoItems.Add(item);
            _context.SaveChanges();

            string json = JsonConvert.SerializeObject(item);

            response.Content = new StringContent(json);
            return response;
        }

        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] ToDoItem obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var item = _context.ToDoItems
                .Where(s => s.Id == id)
                    .FirstOrDefault();
            if (item == null)
            {
                return BadRequest();
            }
            item.Comment = obj.Comment;
            item.IsComplete = obj.IsComplete;

            _context.SaveChanges();
            return Ok("Deleted");
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var item = _context.ToDoItems
                .Where(s => s.Id == id)
                    .FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return NotFound();

            using (var item = new ApplicationDbContext())
            {
                var todo = item.ToDoItems
                    .Where(s => s.Id == id)
                    .FirstOrDefault();

                if (todo == null)
                {
                    return NotFound();
                }
                item.Entry(todo).State = System.Data.Entity.EntityState.Deleted;
                item.SaveChanges();
            }

            return Ok();

        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var todo = _context.ToDoItems;
            if (todo == null || todo.Count() == 0)
            {
                return NotFound();
            }
            return Ok(todo);
        }
    }
}
