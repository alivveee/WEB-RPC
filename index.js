const Peer = require("simple-peer");
const peer = new Peer({
  initiator: location.hash === "#init",
  trickle: false,
});

peer.on("signal", (data) => {
  document.getElementById("yourId").value = JSON.stringify(data);
});

document.getElementById("connect").addEventListener("click", (ev) => {
  ev.preventDefault();
  const otherId = JSON.parse(document.getElementById("otherId").value);
  peer.signal(otherId);

  alert("connect to other ID ");
});

document.getElementById("send").addEventListener("click", (ev) => {
  ev.preventDefault();
  const yourMessage = document.getElementById("yourMessage").value;
  peer.send(yourMessage);

  addMessage("You: " + yourMessage);

  document.getElementById("yourMessage").value = "";
});

peer.on("data", (data) => {
  addMessage("Other: " + data);
});

function addMessage(message) {
  const messagesElement = document.getElementById("messages");
  messagesElement.innerText += message + "\n";
  messagesElement.scrollTop = messagesElement.scrollHeight;
}
