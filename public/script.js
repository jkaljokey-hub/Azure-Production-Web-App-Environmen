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
