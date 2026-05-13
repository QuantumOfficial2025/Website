# QuantumMC+ Official Website

Welcome to the QuantumMC+ official website! This is a professional, advanced website showcasing the QuantumMC+ Minecraft utility client.

## Features

✨ **Modern Design** - Advanced CSS with gradients, animations, and effects
🚀 **Performance Optimized** - Fast loading and smooth interactions
📱 **Fully Responsive** - Works perfectly on all devices
🎨 **Interactive Elements** - Smooth scrolling, hover effects, and animations
⚡ **No Dependencies** - Pure HTML, CSS, and JavaScript (no frameworks needed)

## Structure

```
QuantumWebsite/
├── index.html          # Main website
├── style.css           # All styling
├── script.js           # Interactive features
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## Hosting on GitHub Pages

### Step 1: Setup Your Repository

1. Create a new repository named `<your-username>.github.io` (replace with your actual username)
2. Clone it locally:
   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   cd <your-username>.github.io
   ```

### Step 2: Add Website Files

1. Copy all files from this directory to your repository root
2. Commit and push:
   ```bash
   git add .
   git commit -m "Initial website commit"
   git push origin main
   ```

### Step 3: Access Your Site

Your website will be live at: `https://<your-username>.github.io`

### Alternative: Use a Project Repository

If you want to host this on a project repository instead:

1. Create/clone your project repository
2. Create a `docs/` folder in the root
3. Place all these files in the `docs/` folder
4. Go to Settings → Pages → Source: Deploy from a branch → Branch: main, Folder: /docs
5. Your site will be at: `https://<your-username>.github.io/<project-name>`

## Configuration

### Dynamic Updates via `config.json`

This website supports dynamic changelogs, announcements, and social links using `config.json`.

Edit `config.json` to update:
- announcements
- release notes
- feature updates
- bug fixes
- changelog entries
- Discord invite link
- theme colors

Example Discord config entry:

```json
{
  "social": {
    "discord": "https://discord.gg/YOUR_INVITE_CODE"
  }
}
```

### Update Discord Link

If you prefer not to use `config.json`, you can still set the Discord link in `script.js`:

```javascript
let DISCORD_LINK = 'https://discord.gg/YOUR_INVITE_CODE';
```

### Customize Content

- **Hero Title/Description**: Edit the `<section class="hero">` in `index.html`
- **Features**: Update the feature sections (Combat, Movement, Render, etc.)
- **Colors**: Modify CSS variables in `style.css` (top of file, `:root` selector)
- **Links**: Update GitHub links throughout the HTML

## Customization Guide

### Change Color Scheme

Edit the CSS variables in `style.css`:

```css
:root {
    --primary: #00ff88;           /* Main accent color */
    --secondary: #00ccff;         /* Secondary color */
    --tertiary: #ff00ff;          /* Accent color */
    --bg-dark: #0f0f23;           /* Dark background */
    --text-light: #f0f0f0;        /* Light text */
}
```

### Add More Sections

Copy this template:

```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <p class="section-subtitle">Section subtitle</p>
        <!-- Your content here -->
    </div>
</section>
```

Add corresponding CSS:

```css
.new-section {
    padding: 80px 0;
    background: var(--bg-dark);
}
```

## JavaScript Features

The website includes advanced JavaScript features:

- **Smooth Scrolling** - Animated navigation between sections
- **Scroll Animations** - Elements fade in as they appear
- **Interactive Navigation** - Active link highlighting
- **Particle Effects** - Floating stars in hero section
- **Code Copy** - One-click copy to clipboard for code blocks
- **Accessibility** - Full keyboard navigation support

### Using the QuantumMC Object

In your browser console, you can access:

```javascript
// Update Discord link dynamically
QuantumMC.updateDiscordLink('https://discord.gg/YOUR_CODE');

// Open Discord modal
QuantumMC.showModal();

// View configuration
console.log(QuantumMC.config);
```

## Performance Tips

1. **Images**: The site uses emoji for icons (no image loading)
2. **CSS**: All animations use GPU-accelerated properties
3. **JavaScript**: Minimal code with no external dependencies
4. **Caching**: GitHub Pages enables automatic caching headers

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## SEO Optimization

The site includes:
- Meta tags for search engines
- Proper heading hierarchy (H1, H2, H3)
- Semantic HTML structure
- Mobile viewport settings
- Open Graph tags (add if desired)

## Mobile Optimization

The site is fully responsive:
- Desktop: Full layout with animations
- Tablet: Optimized grid layouts
- Mobile: Stacked single-column layout with touch-friendly buttons

## Advanced Features

### Copy Code Blocks

All code blocks have a copy button that appears on hover.

### Smooth Animations

- Fade-in animations on scroll
- Hover effects on interactive elements
- Smooth color transitions
- Floating particle effects

### Keyboard Navigation

- Tab through all interactive elements
- Enter key to activate buttons/links
- Arrow keys for page scrolling

## Troubleshooting

### Site not showing at GitHub Pages URL?

1. Check repository settings → Pages
2. Ensure source is set to "Deploy from a branch"
3. Branch is set to "main" and folder is "/ (root)"
4. Wait a few minutes for GitHub to deploy

### Discord link modal appearing?

Update the `DISCORD_LINK` in `script.js` with your actual invite URL.

### Styles not loading?

1. Hard refresh your browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for errors (F12)

### Animations not working?

Check if animations are disabled in CSS preferences:
- System Settings → Accessibility → Display → Reduce Motion

## File Sizes

- `index.html` - ~20 KB
- `style.css` - ~25 KB
- `script.js` - ~12 KB
- **Total**: ~57 KB (highly optimized!)

## Future Enhancements

Potential improvements:
- Blog/news section
- Installation guide with video
- Module showcase gallery
- Community forum integration
- Changelog page

## License

This website is provided as-is for the QuantumMC+ project.

## Support

For questions or issues:
1. Check this README
2. Review the source code (well-commented)
3. Open an issue on GitHub
4. Join the Discord community

---

**Made with ❤️ for the QuantumMC+ community**

Start hosting today! 🚀
