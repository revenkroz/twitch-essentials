export function sendMessage(command) {
  browser.tabs.query({active: true, currentWindow: true})
    .then(async (tabs) => {
      await browser.tabs.sendMessage(tabs[0].id, command);
    })
    .catch((error) => {
      console.error(`Could not send message for command ${command.name}: ${error}`);
    });
}

export function getDataFromForm(form) {
  const formData = new FormData(form);
  let data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value.trim();
  }

  // TODO: make a proper validation
  if (data.name === '' || data.content === '') {
    throw new Error('Validation Error');
  }

  return data;
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
