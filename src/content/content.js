(function() {
  if (window._twitchEssentials) {
    return;
  }
  window._twitchEssentials = true;

  function autoSend(data) {
    const elem = document.querySelector('[data-a-target="chat-input"]');
    const valueSetter = Object.getOwnPropertyDescriptor(elem, 'value')?.set; // it may not exist
    const proto = Object.getPrototypeOf(elem);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(proto, 'value').set;

    if (valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(elem, data);
    } else {
      valueSetter.call(elem, data);
    }

    elem.dispatchEvent(new Event('input', { bubbles: true }));

    document.querySelector('[data-a-target="chat-send-button"]').click();
  }

  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  browser.runtime.onMessage.addListener(async (message) => {
    if (message.type === "send") {
      autoSend(message.content);
    } else if (message.type === "reset") {
      removeExistingBeasts();
    }

    return true;
  });
})();
