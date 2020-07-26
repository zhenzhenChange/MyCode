const audioContext = new AudioContext();

const bufferSize = 4096;
const iptChannels = 1;
const outChannels = 1;

function onProcess(e) {
  const data = e.inputBuffer.getChannelData(0);
  console.log(e.inputBuffer, data);
}

function onStream(stream) {
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(bufferSize, iptChannels, outChannels);

  source.connect(processor);
  processor.connect(audioContext.destination);
  processor.onaudioprocess = onProcess;
}

navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(onStream);
