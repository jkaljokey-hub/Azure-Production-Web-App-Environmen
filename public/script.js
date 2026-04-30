function callApi() {
  fetch("/api/hello")
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").innerText = data.message;
    })
    .catch(err => {
      document.getElementById("response").innerText = "Error calling API";
    });
}
async function loadMessages() {
  const res = await fetch("/api/messages");
  const data = await res.json();

  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  data.forEach(msg => {
    const li = document.createElement("li");
    li.innerText = `${msg.name}: ${msg.message}`;
    list.appendChild(li);
  });
}