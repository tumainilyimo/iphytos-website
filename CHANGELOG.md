# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Enhanced Partners component slider functionality
  - Increased card width from 280px to 320px
  - Increased gap between cards from 16px to 24px
  - Increased card height from 160px to 180px
  - Slowed down animation duration from 20s to 25s
  - Reduced hover scale effect for smoother transitions
  - Increased padding from p-6 to p-8
  - Adjusted logo size to 95% of container
  - Added smooth fade effects with gradient overlays
- Optimized all website images for better performance:
  - Added WebP and AVIF format conversions
  - Created responsive image sizes (320px, 640px, 960px, 1280px)
  - Implemented quality optimization (60% for AVIF, 80% for WebP)
  - Applied optimization to all images in public directory
- Created ResponsiveImage component for improved image loading:
  - Automatic format selection based on browser support
  - Responsive size selection based on viewport
  - Lazy loading enabled by default
  - Fallback support for older browsers
- Optimized Hero section images for faster loading:
  - Added support for next-gen image formats (WebP/AVIF)
  - Implemented responsive image sizes
  - Optimized quality settings
- Created a new ResponsiveImage component for optimized image loading
  - Automatic format selection based on browser support
  - Responsive source sets for different viewport sizes
  - Lazy loading enabled by default
- Improved slider performance and image loading
  - Added proper alt texts for accessibility
  - Reduced initial page load size
  - Improved Core Web Vitals scores

### Added
- Initial CHANGELOG.md file
- Added image optimization workflow:
  - Automatic WebP and AVIF generation
  - Multiple resolution variants (320px to 1280px)
  - Quality optimization per format
  - Progressive image loading
