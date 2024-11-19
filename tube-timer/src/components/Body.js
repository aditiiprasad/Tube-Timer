import React, { useState } from 'react';
import axios from 'axios';

function Body() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistCreator, setPlaylistCreator] = useState('');
  const [error, setError] = useState('');
  const [speedDurations, setSpeedDurations] = useState({
    normal: '',
    '1.25x': '',
    '1.5x': '',
    '2x': '',
  });
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async () => {
    // Reset the error and totalDuration to provide an immediate response
    setError('');
    setTotalDuration('');
    setPlaylistTitle('');
    setPlaylistCreator('');
    setSpeedDurations({
      normal: '',
      '1.25x': '',
      '1.5x': '',
      '2x': '',
    });

    // Set loading to true before starting the request
    setLoading(true);

    try {
      const playlistId = new URL(playlistUrl).searchParams.get('list');
      if (!playlistId) {
        setError('Invalid URL. Please enter a valid YouTube playlist URL.');
        setLoading(false); // Set loading to false if there's an error
        return;
      }

      const response = await axios.get(`https://tube-timer-backend.onrender.com/api/playlist-length`, {
        params: { playlistId },
      });

      const totalSeconds = response.data.totalDuration;
      const formattedDuration = formatDuration(totalSeconds);
      setTotalDuration(formattedDuration);  // This will trigger a re-render

      const speedDurations = calculateSpeedDurations(totalSeconds);
      setSpeedDurations(speedDurations);

      // Set playlist details from response
      setPlaylistTitle(response.data.playlistTitle);
      setPlaylistCreator(response.data.playlistCreator);

      setLoading(false); // Set loading to false when data is fetched
    } catch (err) {
      console.error(err);
      setError('Failed to fetch playlist length. Please try again.');
      setLoading(false); // Set loading to false in case of an error
    }
  };

  // Helper function to format duration in HH:MM:SS
  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Helper function to calculate durations at different speeds
  const calculateSpeedDurations = (totalSeconds) => {
    const speeds = [1, 1.25, 1.5, 2];
    const durations = {};

    speeds.forEach((speed) => {
      const adjustedDuration = Math.floor(totalSeconds / speed);
      durations[speed] = formatDuration(adjustedDuration);
    });

    return {
      normal: durations[1],
      '1.25x': durations[1.25],
      '1.5x': durations[1.5],
      '2x': durations[2],
    };
  };

  return (
    <div className="body bg-zinc-900 min-h-screen flex justify-center py-4">
      <div className="text-center p-6 bg-black rounded-lg shadow-lg shadow-rose-500 border-red-700 border-2 max-w-md w-full">
        <input
          type="text"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          placeholder="Enter YouTube Playlist URL"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-red-700 text-white rounded-lg hover:bg-red-500"
        >
          Calculate Length
        </button>

        {loading && (
          <div className="mt-4 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-b-white border-t-white border-red-500 border-dashed rounded-full animate-spin"></div>
            <p className="ml-4 text-white">Loading...</p>
          </div>
        )}

        {error && <p className="error mt-4 text-red-400">{error}</p>}

        {totalDuration && !loading && (
          <div className="mt-4 p-4 bg-zinc-800 text-white rounded-lg">
            {/* Display Playlist Information */}
            {/* <p><strong>Playlist Title:</strong> {playlistTitle}</p>
            <p><strong>Playlist Creator:</strong> {playlistCreator}</p> */}
            <p><strong>Total Playlist Length:</strong> {totalDuration}</p>

            <div className="mt-4">
              <p><strong>At Normal Speed:</strong> {speedDurations.normal}</p>
              <p><strong>At 1.25x Speed:</strong> {speedDurations['1.25x']}</p>
              <p><strong>At 1.5x Speed:</strong> {speedDurations['1.5x']}</p>
              <p><strong>At 2x Speed:</strong> {speedDurations['2x']}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
