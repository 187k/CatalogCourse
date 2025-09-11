using System;
using System.Collections.Generic;

namespace CatalogCourse.Models;

public partial class Guide
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Language { get; set; } = null!;

    public string? Link { get; set; }
}
