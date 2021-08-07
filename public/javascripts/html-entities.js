document.querySelectorAll('.message-text').forEach(message => {
  let str = message.innerHTML;
  message.innerHTML = str.replace(/&amp;/g, "&");
});
