const audioContext = new AudioContext();
function decodeAudio(data) {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(data, (buffer) => resolve(buffer));
  });
}

async function loadBinaryDataFromUrl(url) {
  const req = new Request(url);
  const res = await fetch(req);
  if (!res.ok) throw Error(res.statusText);
  return res.arrayBuffer();
}

function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}

(async function () {
  const url = './mp3.mp3';
  const data = await loadBinaryDataFromUrl(url);
  const audio = await decodeAudio(data);

  playSound(audio);
})();

const play = document.getElementById('play');
play.addEventListener('click', function () {
  console.log(audioContext.state);
  switch (audioContext.state) {
    case 'suspended':
      audioContext.resume();
      break;
    case 'running':
      audioContext.close();
  }
  console.log(audioContext.state);
});
