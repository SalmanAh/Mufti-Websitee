/**
 * Utility functions for YouTube video handling
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL
 * @returns Video ID or null if not a valid YouTube URL
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Generates YouTube thumbnail URL from video URL
 * @param videoUrl - YouTube video URL
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'standard', 'maxres')
 * @returns Thumbnail URL or null if not a valid YouTube URL
 */
export function getYouTubeThumbnail(videoUrl: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string | null {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) return null;
  
  const qualityMap = {
    'default': 'default.jpg',
    'medium': 'mqdefault.jpg',
    'high': 'hqdefault.jpg',
    'standard': 'sddefault.jpg',
    'maxres': 'maxresdefault.jpg'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Generates YouTube embed URL from video URL
 * @param videoUrl - YouTube video URL
 * @returns Embed URL or null if not a valid YouTube URL
 */
export function getYouTubeEmbedUrl(videoUrl: string): string | null {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Checks if a URL is a valid YouTube URL
 * @param url - URL to check
 * @returns Boolean indicating if URL is a valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}