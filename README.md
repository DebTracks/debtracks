# Debtracks - Music Portfolio Website

A modern, interactive music portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🎵 Interactive music player with waveform visualization
- 🎸 Animated guitar strings
- 🎨 Modern glassmorphism design
- 🎭 Smooth animations and transitions
- 📱 Fully responsive design
- 🎨 Custom color themes for each track

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/debtracks.git
cd debtracks
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
debtracks/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MusicPlayer.tsx
│   ├── music/
│   │   └── page.tsx
│   ├── globals.css
│   └── page.tsx
├── public/
│   └── music/
│       ├── Sinistervelvet-debtracks.mp3
│       ├── Knives-debtracks.mp3
│       ├── Astranova-debtracks.mp3
│       ├── Masked-debtracks.mp3
│       ├── Shadows-debtracks.mp3
│       └── Whispers-debtracks.mp3
└── package.json
```

## Deployment

This project can be deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure the build settings:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
4. Deploy!

## Customization

- Add your own music tracks in the `public/music` directory
- Update track information in `app/music/page.tsx`
- Modify colors and animations in `app/globals.css`

## License

MIT License - feel free to use this project as a template for your own music portfolio.

## Contact

For any questions or suggestions, please reach out to [your-email@example.com](mailto:your-email@example.com) 