# WebStackPage Navigation Example

A complete navigation page template inspired by WebStackPage.

## Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tools Navigation - Multi Tools</title>
</head>
<body>
    <h1>All Tools</h1>
    
    <!-- Image Tools -->
    <section>
        <h2>Image Tools</h2>
        <ul>
            <li><a href="/tools/image-compressor.html">Image Compressor</a></li>
            <li><a href="/tools/image-converter.html">Image Converter</a></li>
            <li><a href="/tools/image-resizer.html">Image Resizer</a></li>
        </ul>
    </section>
    
    <!-- Text Tools -->
    <section>
        <h2>Text Tools</h2>
        <ul>
            <li><a href="/tools/word-counter.html">Word Counter</a></li>
            <li><a href="/tools/markdown-editor.html">Markdown Editor</a></li>
        </ul>
    </section>
    
    <!-- ... more sections -->
</body>
</html>
```

## Advanced Features

### Search Functionality
```javascript
function searchTools() {
    const query = document.getElementById('search').value.toLowerCase();
    const tools = document.querySelectorAll('.tool-link');
    
    tools.forEach(tool => {
        const text = tool.textContent.toLowerCase();
        tool.parentElement.style.display = text.includes(query) ? '' : 'none';
    });
}
```

### Category Filtering
```javascript
function filterByCategory(category) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const show = category === 'all' || section.dataset.category === category;
        section.style.display = show ? '' : 'none';
    });
}
```

### Tag-Based Navigation
Add tags to tools for better organization:
```html
<a href="/tools/json-formatter.html" 
   data-tags="developer,json,format"
   class="tool-link">
  JSON Formatter
</a>
```

## SEO Considerations

1. **Internal Linking**: Link all tools from navigation
2. **Breadcrumbs**: Add navigation path
3. **Sitemap**: Include in robots.txt
4. **Canonical URLs**: Set proper canonical links

## Responsive Design

```css
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

@media (max-width: 768px) {
    .tools-grid {
        grid-template-columns: 1fr;
    }
}
```