# Mohan Kumar's Video Editing Portfolio Website

A sleek, modular, and storytelling-driven website that showcases Mohan Kumar's video editing portfolio. Built with HTML5, CSS3, and vanilla JavaScript, inspired by 21st.dev's modular templates and carousel elements.

## 🎯 Features

### Core Pages
- **Homepage** - Hero section with animated background and featured videos carousel
- **Portfolio** - Category-filtered video grid with carousels for each category
- **Services** - Modular service cards with detailed information and pricing
- **About** - Profile section with timeline and skills showcase
- **Contact** - Contact form with validation and FAQ section

### Key Features
- ✨ **21st.dev-inspired Design** - Modern, minimal dark theme with golden accents
- 🎬 **Video Showcase** - Carousels, grids, and hover previews for video content
- 📱 **Mobile Responsive** - Seamless experience across all devices
- 🎨 **Smooth Animations** - Scroll-based animations and hover effects
- 🔍 **Portfolio Filtering** - Dynamic filtering by category (Weddings, Events, Festivals, etc.)
- 📧 **Contact Form** - Validated contact form with real-time feedback
- 🎯 **SEO Optimized** - Semantic HTML and proper meta tags

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A local web server (for development)

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser, or
3. **Serve** the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. **Open** `http://localhost:8000` in your browser

## 📁 Project Structure

```
portfolio-site/
├── index.html              # Homepage
├── portfolio.html          # Portfolio page
├── services.html           # Services page
├── about.html              # About page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── carousel.js     # Carousel components
│   │   ├── modal.js        # Video/image modals
│   │   ├── portfolio.js    # Portfolio filtering
│   │   ├── contact.js      # Contact form
│   │   └── about.js        # About page animations
│   └── images/
│       └── thumbnails/     # Video thumbnail images
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: #FFD700 (Golden Yellow)
- **Background**: #121212 (Dark)
- **Surface**: #1e1e1e (Dark Gray)
- **Text Primary**: #ffffff (White)
- **Text Secondary**: #b3b3b3 (Light Gray)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Video cards, service cards, philosophy cards
- **Carousels**: Auto-playing with touch/swipe support
- **Modals**: Video and image modals with smooth animations

## 🔧 Customization

### Adding New Videos
1. Add video files to `assets/videos/` directory
2. Create thumbnails and add to `assets/images/thumbnails/`
3. Update the portfolio grid in `portfolio.html`
4. Add video data attributes for modal functionality

### Modifying Services
1. Edit service cards in `services.html`
2. Update pricing and descriptions
3. Modify the services grid layout in `style.css`

### Changing Colors
1. Update CSS custom properties in `:root` selector
2. Modify gradient definitions
3. Update hover and focus states

## 📱 Mobile Responsiveness

The website is fully responsive with:
- **Mobile-first** design approach
- **Flexible grid** layouts
- **Touch-friendly** navigation
- **Optimized** carousel controls for mobile
- **Responsive** typography and spacing

## 🎬 Video Integration

### Current Setup
- Placeholder video sources in HTML
- Thumbnail images for video previews
- Modal system for fullscreen video playback

### Adding Real Videos
1. Replace placeholder video sources with actual video files
2. Update thumbnail images with real video screenshots
3. Configure video hosting (YouTube, Vimeo, or self-hosted)

## 📧 Contact Form

### Current Implementation
- Client-side validation
- Form submission simulation
- Success/error notifications

### Backend Integration
To connect with a real backend:
1. Update the `submitFormData` function in `contact.js`
2. Add your API endpoint
3. Handle form data processing
4. Implement email sending functionality

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch
4. Access via `https://username.github.io/repository-name`

### Netlify
1. Connect GitHub repository to Netlify
2. Configure build settings (no build needed for static site)
3. Deploy automatically on code changes

### Vercel
1. Import GitHub repository
2. Configure as static site
3. Deploy with custom domain

## 🔍 SEO Optimization

- Semantic HTML structure
- Meta tags and descriptions
- Open Graph tags for social sharing
- Structured data markup
- Optimized images and lazy loading

## 🛠️ Browser Support

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+

## 📄 License

This project is created for Mohan Kumar's video editing portfolio. All rights reserved.

## 🤝 Contributing

This is a personal portfolio website. For suggestions or improvements, please contact Mohan Kumar directly.

## 📞 Contact

**Mohan Kumar** - Professional Video Editor
- Email: mohan.kumar@email.com
- Phone: +91 98765 43210
- Location: Hyderabad, Telangana, India

---

Built with ❤️ using HTML5, CSS3, and JavaScript
