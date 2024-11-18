const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Endpoint to get playlist length
app.get('/api/playlist-length', async (req, res) => {
  const { playlistId } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  let nextPageToken = '';
  let totalDuration = 0;

  try {
    do {
      // Fetch playlist items
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        params: {
          part: 'contentDetails',
          maxResults: 50,
          playlistId,
          pageToken: nextPageToken,
          key: YOUTUBE_API_KEY,
        },
      });

      const videoIds = response.data.items.map(item => item.contentDetails.videoId).join(',');

      // Fetch video details
      const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'contentDetails',
          id: videoIds,
          key: YOUTUBE_API_KEY,
        },
      });

      // Calculate total duration
      videoResponse.data.items.forEach(video => {
        const duration = video.contentDetails.duration;
        totalDuration += parseISO8601Duration(duration);
      });

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    res.json({ totalDuration });
  } catch (error) {
    // Enhanced error handling and logging
    console.error('Error occurred while fetching playlist data: ', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
    } else {
      // Other errors
      console.error('Error message:', error.message);
    }
    res.status(500).json({ error: 'Failed to fetch playlist length' });
  }
});

// Helper function to parse ISO 8601 duration
function parseISO8601Duration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
