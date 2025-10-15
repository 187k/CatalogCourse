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
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Guide guide)
        {
            if (ModelState.IsValid)
            {
                _context.Guides.Add(guide);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }

            return View(guide);
        }

        public IActionResult Delete(int id)
        {
            var guide = _context.Guides.FirstOrDefault(g => g.Id == id);
            if (guide != null)
            {
                _context.Guides.Remove(guide);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id)
        {
            var guide = _context.Guides.FirstOrDefault(g => g.Id == id);
            if (guide == null)
            {
                return NotFound();
            }
            return View(guide);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Guide guide)
        {
            if (id != guide.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _context.Update(guide);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }

            return View(guide);
        }
    }
}
