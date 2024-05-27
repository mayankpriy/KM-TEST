(function (d, m) {
  var kommunicateSettings = {
      "appId": "3cb4c0313bf1d56db7883675d6d1c91cf",
      "popupWidget": true,
      "automaticChatOpenOnNavigation": true,
      "hidePostCTA": true,
      "labels": { 
          'closed.conversation.message': 'This conversation has been marked as resolved. If you have other queries, kindly drop a mail to sales@callhippo.com.' 
      },
      "onInit": function () {
          var isChatWidgetHidden = localStorage.getItem("isChatWidgetHidden");
          if (isChatWidgetHidden === "true") {
              hideChatWidgetWithoutLocalStorage();
              customizeCSS();
          }
          
          subscribeToKommunicateEvents();
      }
  };

  function showChatWidget() {
      var chatBox = KommunicateGlobal.document.querySelector(".mck-box-form.mck-row");
      if (chatBox) {
          chatBox.style.visibility = "visible";
          chatBox.style.display = "block";
          localStorage.setItem("isChatWidgetHidden", "false");
      }
  }

  function hideChatWidget() {
      var chatBox = KommunicateGlobal.document.querySelector(".mck-box-form.mck-row");
      if (chatBox) {
          chatBox.style.visibility = "hidden";
          chatBox.style.display = "none";
          localStorage.setItem("isChatWidgetHidden", "true");
      }
  }

  function hideChatWidgetWithoutLocalStorage() {
      var chatBox = KommunicateGlobal.document.querySelector(".mck-box-form.mck-row");
      if (chatBox) {
          chatBox.style.visibility = "hidden";
          chatBox.style.display = "none";
      }
  }

  function customizeCSS() {
      var css = ".mck-tab-link.mck-back-btn-container{ display: none !important; }";
      Kommunicate.customizeWidgetCss(css);
      var css1 = ".mck-name-status-container{ margin-left: 50px; }";
      Kommunicate.customizeWidgetCss(css1);
  }

  function subscribeToKommunicateEvents() {
      var events = {
          'onMessageReceived': function (resp) {
              console.log("onMessageReceived:: resp", resp);
              console.log("onMessageReceived:: resp.message", resp?.message);
              console.log("onMessageReceived:: resp.message.metadata", resp?.message?.metadata);
              console.log("onMessageReceived:: resp.message.metadata.action", resp?.message?.metadata?.action);

              if (!resp || !resp.message || !resp.message.metadata) {
                  console.error("Invalid message received:", resp);
                  return;
              }

              var action = resp.message.metadata.action;
              switch (action) {
                  case "NewCustomer":
                  case "ExistingCustomer":
                      showChatWidget();
                      var css2 = ".mck-file-upload.mck-icon-upload{display: none !important;}";
                      Kommunicate.customizeWidgetCss(css2);
                      break;
                  case "users":
                  case "welcome":
                  case "hidetextarea":
                  case "hideforinvalidemail":
                      hideChatWidget();
                      customizeCSS();
                      break;
                  default:
                      console.log("Unknown action:", action);
              }

              console.log("onMessageReceived::", resp);
          },
          'onMessageSent': function (resp) {
              console.log("onMessageSent::", resp);
          }
      };
      Kommunicate.subscribeToEvents(events);
  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
  var h = document.getElementsByTagName("head")[0];
  h.appendChild(s);
  window.kommunicate = m;
  m._globals = kommunicateSettings;
})(document, window.kommunicate || {});
