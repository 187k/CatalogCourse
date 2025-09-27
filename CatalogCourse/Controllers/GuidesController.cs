using Microsoft.AspNetCore.Mvc;
using CatalogCourse.Models;
using System.Linq;

namespace CatalogCourse.Controllers
{
    public class GuidesController : Controller
    {
        private readonly CatalogCourseDbContext _context;

        public GuidesController(CatalogCourseDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(string? language)
        {
            var languages = _context.Guides
                .Select(g => g.Language)
                .Distinct()
                .ToList();

            ViewBag.Languages = languages;
            ViewBag.SelectedLanguage = language;

            var guides = _context.Guides.AsQueryable();

            if (!string.IsNullOrEmpty(language))
            {
                guides = guides.Where(g => g.Language == language);
            }

            return View(guides.ToList());
        }
    }
}
