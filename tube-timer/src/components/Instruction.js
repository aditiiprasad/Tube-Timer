import React from 'react';

function Instruction() {
  return (
    <div className="bg-black text-white  rounded-lg shadow-lg border-red-600 border-2  ">
      <h2 className="text-2xl font-semibold text-center mb-4">How to Use Tube Timer?</h2>
      <p className="text-lg text-center mb-4 text-gray-500">
        Tube Timer helps you track the total duration of a YouTube playlist and calculate how long it would take to watch at different speeds.
        </p>
        <p className='text-red-700'>
        Simply follow these steps:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter a YouTube playlist URL in the input field.</li>
        <li>Click the "Calculate Length" button to fetch data.</li>
        <li>View the total playlist duration and speed-based durations (1x, 1.25x, 1.5x, and 2x).</li>
        
      </ol>
      <p className="text-center mt-4 text-gray-500">
        Start using Tube Timer to manage your playlist viewing times efficiently!
      </p>
    </div>
  );
}

export default Instruction;
