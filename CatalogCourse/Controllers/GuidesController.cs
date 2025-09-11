using CatalogCourse.Models;
using Microsoft.AspNetCore.Mvc;

namespace CatalogCourse.Controllers
{
    public class GuidesController : Controller
    {
        private readonly CatalogCourseDbContext _context;

        public GuidesController(CatalogCourseDbContext context)
        {
            _context = context;
        }

        // Метод Index: выводит список всех руководств
        public IActionResult Index()
        {
            var guides = _context.Guides.ToList();
            return View(guides); // ищет Views/Guides/Index.cshtml
        }
    }
}
