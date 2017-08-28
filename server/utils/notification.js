const notifyMe = function (message/*, user*/) {  //quand j aurai le user
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
        var options = {
                body: "Il y aura le user",
                icon: "icon.png",
                dir : "ltr"
             };
          var notification = new Notification(message,options);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }

      if (permission === "granted") {
        var options = {
              body: "Il y aura le user",
              icon: "icon.png",
              dir : "ltr"
          };
        var notification = new Notification(message,options);
      }
    });
  }
}

module.exports = {notifyMe}
