using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CatalogCourse.Models;

public partial class Guide
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Введите название курса")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Укажите язык программирования")]
    public string Language { get; set; }

    [Required(ErrorMessage = "Добавьте описание")]
    [StringLength(500)]
    public string Description { get; set; }

    [Url(ErrorMessage = "Введите корректную ссылку")]
    public string Link { get; set; }
}
