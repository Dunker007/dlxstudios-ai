# DLX Studios AI

A modern, responsive website for DLX Studios AI - showcasing AI-powered creative solutions.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional interface with smooth animations
- **Interactive Elements**: Smooth scrolling, hover effects, and form handling
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Lightweight and optimized for performance

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Dunker007/dlxstudios-ai.git
cd dlxstudios-ai
```

2. Open `index.html` in your browser, or use a local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## 📦 Deployment

This website is ready to deploy on various platforms:

### GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select source: Deploy from a branch
4. Choose `main` branch and `/ (root)` folder
5. Click Save
6. Your site will be available at `https://dunker007.github.io/dlxstudios-ai/`

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Deploy settings are already configured in `netlify.toml`
6. Click "Deploy site"

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy settings are already configured in `vercel.json`
6. Click "Deploy"

### Other Hosting Providers

The site consists of static HTML, CSS, and JavaScript files, so it can be deployed to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Cloudflare Pages
- Any web server (Apache, Nginx, etc.)

Simply upload all files to your hosting provider's web root directory.

## 📁 Project Structure

```
dlxstudios-ai/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── package.json        # Project metadata
├── netlify.toml        # Netlify configuration
├── vercel.json         # Vercel configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #60a5fa;
    /* ... more colors */
}
```

### Content
- Edit text content directly in `index.html`
- Modify sections, add/remove features as needed
- Update meta tags for SEO

### Styling
- All styles are in `styles.css`
- Mobile-responsive breakpoints at 768px and 480px
- Uses CSS Grid and Flexbox for layouts

## 🔧 Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- No external dependencies or frameworks

## 📄 License

MIT License - feel free to use this template for your own projects.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

For questions or support, please use the contact form on the website.
