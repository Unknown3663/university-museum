<div align="center">

# 🏛️ Tourist Guidance Museum

### Digital Platform for Heritage Preservation and Education

_Faculty of Tourism and Hotels, Minia University_

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

</div>

---

## 📖 About The Project

This platform supports the **Friends of Museum** initiative at the Faculty of Tourism and Hotels, Minia University. Launched to coincide with the opening of the **Grand Egyptian Museum** (November 1st, 2025), this digital platform aims to foster Egyptian identity and heritage preservation.

### 🎯 Initiative: "It's Your Own: Protect Your Identity"

The platform serves dual purposes:

1. **Public Heritage Portal** - Showcasing the educational museum's collection of archaeological artifact replicas
2. **Administrative Dashboard** - Managing exhibits, workshops, and educational content

---

## ✨ Key Features

### 🌐 Public Website

<table>
<tr>
<td width="50%">

#### 🏠 Interactive Homepage

- Dynamic hero section with museum imagery
- Smooth scroll animations
- Responsive design for all devices
- College and university branding integration

</td>
<td width="50%">

#### 🔍 Smart Search

- Real-time exhibit search
- Live results with thumbnails
- Filter by title and description
- Mobile-optimized interface

</td>
</tr>
<tr>
<td width="50%">

#### 🎨 Exhibits Gallery

- Comprehensive artifact catalog
- High-quality image display
- Detailed descriptions (Arabic & English)
- Pagination for easy browsing

</td>
<td width="50%">

#### 📚 Educational Content

- Workshop announcements
- Team member profiles
- Initiative goals and objectives
- GEM countdown integration

</td>
</tr>
</table>

### 🔐 Admin Dashboard

<table>
<tr>
<td width="50%">

#### 📊 Management Portal

- Secure authentication system
- Real-time statistics dashboard
- Intuitive navigation sidebar
- Mobile-responsive interface

</td>
<td width="50%">

#### 🖼️ Exhibit Management

- Upload exhibits with images
- Edit existing artifacts
- Publish/unpublish control
- Bulk operations support

</td>
</tr>
<tr>
<td width="50%">

#### 📅 Workshop Management

- Create workshop events
- Order and schedule control
- Date and description management
- Publish status tracking

</td>
<td width="50%">

#### 🎯 Content Control

- Draft and publish workflow
- Image optimization
- Multi-language support ready
- SEO-friendly structure

</td>
</tr>
</table>

---

## 🎨 Design Highlights

### Visual Identity

- **Typography**: Playfair Display (serif) for elegance, Inter (sans-serif) for readability
- **Color Palette**: Museum-inspired earth tones with modern blue accents
- **Imagery**: High-quality backgrounds featuring Egyptian heritage
- **Animations**: Smooth Framer Motion transitions for enhanced UX

### User Experience

- ⚡ **Fast Loading**: Optimized images and lazy loading
- 📱 **Mobile First**: Responsive design from 320px to 4K displays
- ♿ **Accessible**: WCAG compliant with ARIA labels
- 🎯 **Intuitive**: Clear navigation and user flows

---

## 🏗️ Technical Architecture

### Frontend Stack

```
Next.js 15 (App Router)
├── React 18 Server Components
├── Tailwind CSS + PostCSS
├── Framer Motion Animations
├── Next/Image Optimization
└── Dynamic Imports
```

### Backend Services

```
Supabase Backend
├── PostgreSQL Database
├── Row Level Security (RLS)
├── Authentication & Authorization
├── Storage Buckets
└── Real-time Subscriptions
```

### Project Structure

```
University-Museum/
│
├── public-site/              # Public-facing website
│   ├── app/
│   │   ├── page.jsx         # Homepage
│   │   ├── exhibits/        # Exhibit gallery
│   │   ├── workshops/       # Workshops page
│   │   ├── team/           # Team members
│   │   ├── api/            # API routes
│   │   └── components/     # Reusable components
│   ├── lib/
│   │   └── supabaseClient.js
│   └── public/
│       ├── backgrounds/    # Hero images
│       └── logos/         # Branding assets
│
├── museum-dashboard/         # Admin dashboard
│   ├── app/
│   │   ├── login/          # Authentication
│   │   └── dashboard/
│   │       ├── page.jsx    # Dashboard home
│   │       ├── upload/     # Exhibit upload
│   │       ├── exhibits/   # Exhibit management
│   │       ├── workshops/  # Workshop management
│   │       └── components/ # Dashboard UI
│   └── lib/
│       └── supabaseClient.js
│
└── shared/                   # Shared utilities (planned)
```

---

## 🎓 Educational Mission

### Platform Objectives

Aligned with **Egypt's Vision 2030**, our platform contributes to:

1. **Heritage Awareness** 🏺

   - Conducting workshops on heritage preservation
   - Training museum teams in best practices
   - Implementing AI applications for heritage conservation

2. **Digital Documentation** 📱

   - Upgrading the educational museum catalog
   - Maintaining comprehensive artifact database
   - Multi-language accessibility (Arabic/English)

3. **Community Engagement** 👥

   - Publishing museology announcements
   - Educational program promotion
   - Virtual museum experiences

4. **Identity Preservation** 🇪🇬
   - Strengthening Egyptian cultural identity
   - Promoting heritage awareness
   - Supporting local museum initiatives

---

## 🛡️ Security & Performance

### Security Measures

- 🔐 **Authentication**: Supabase Auth with secure session management
- 🛡️ **Authorization**: Row Level Security (RLS) policies
- 🔒 **Data Protection**: Encrypted connections (SSL/TLS)
- 👁️ **Access Control**: Role-based permissions
- 🚫 **Input Validation**: Client and server-side validation

### Performance Optimization

- ⚡ **Static Generation**: Pre-rendered pages for speed
- 🖼️ **Image Optimization**: Next/Image with WebP format
- 📦 **Code Splitting**: Automatic bundle optimization
- 🗃️ **Caching**: Smart caching strategies
- 📊 **Monitoring**: Real-time performance tracking

---

## 🌟 Key Features Showcase

### Public Site Features

| Feature       | Description                                | Status  |
| ------------- | ------------------------------------------ | ------- |
| 🏠 Homepage   | Dynamic hero with museum branding          | ✅ Live |
| 🔍 Search     | Real-time exhibit search with live results | ✅ Live |
| 🖼️ Exhibits   | Paginated gallery with 22+ artifacts       | ✅ Live |
| 📅 Workshops  | Workshop schedule and announcements        | ✅ Live |
| 👥 Team       | Faculty and team member profiles           | ✅ Live |
| 📱 Responsive | Mobile-first responsive design             | ✅ Live |
| 🌐 SEO        | Optimized meta tags and structure          | ✅ Live |

### Dashboard Features

| Feature      | Description                         | Status  |
| ------------ | ----------------------------------- | ------- |
| 📊 Dashboard | Real-time statistics and overview   | ✅ Live |
| ➕ Upload    | Exhibit creation with image upload  | ✅ Live |
| ✏️ Edit      | Update existing exhibits            | ✅ Live |
| 🗑️ Delete    | Remove exhibits with confirmation   | ✅ Live |
| 📢 Publish   | Control exhibit visibility          | ✅ Live |
| 📅 Workshops | Create and manage workshop events   | ✅ Live |
| 🔒 Auth      | Secure login and session management | ✅ Live |

---

## 👥 The Team

### Friends Of Museum Initiative

**Faculty Leadership:**

- Prof. Samar Mustafa - College Dean
- Prof. Engy Elkilany - College Vice Dean
- Dr. Gehad Mohamed - Initiative Coordinator

**Museum Team:**

- Mohand Hesham - Team Leader
- Ezzat Maged - Web Developer
- Ziad Khalaf - Curator
- Mahmoud Farghly - Curator
- Mala Amr - Curator
- Romaysaa Mohamed - Curator
- Rogena Hany - Curator
- Shahd Esaam - Curator
- Shahd Ahmad - Curator
- Hanin Ahmed - Curator
- Login Ahmed - Curator
- Samuil Hany - Curator

---

## 📸 Screenshots

<div align="center">

### Public Website

_Homepage showcasing the museum's mission and heritage_

### Exhibits Gallery

_Interactive catalog of 22+ archaeological artifact replicas_

### Admin Dashboard

_Comprehensive management portal for content administration_

</div>

---

## 🎯 Future Enhancements

- 🌍 **Multi-language Support**: Full Arabic/English bilingual interface
- 🤖 **AI Integration**: Heritage preservation recommendations
- 📱 **Mobile App**: Native iOS/Android applications
- 🎥 **Virtual Tours**: 3D exhibit exploration
- 📊 **Analytics Dashboard**: Visitor insights and engagement metrics
- 🔔 **Notifications**: Workshop alerts and announcements
- 💬 **Community Features**: User comments and feedback
- 🎓 **Educational Resources**: Downloadable study materials

---

## 📞 Contact & Support

<div align="center">

**Faculty of Tourism and Hotels**  
Minia University, Egypt

🌐 [Website](https://tourism.minia.edu.eg) | 📧 [Email](mailto:tourism@minia.edu.eg)

---

### ⭐ Star this repository if you find it valuable!

**Built with ❤️ by the Friends Of Museum Team**

_"Protecting our heritage, strengthening our identity"_

</div>

---

<div align="center">

© 2025 Friends Of Museum - Faculty of Tourism and Hotels, Minia University

_All rights reserved_

</div>
