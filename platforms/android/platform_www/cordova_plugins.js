cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-camera-preview.CameraPreview",
      "file": "plugins/cordova-plugin-camera-preview/www/CameraPreview.js",
      "pluginId": "cordova-plugin-camera-preview",
      "clobbers": [
        "CameraPreview"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.Acceleration",
      "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "Acceleration"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.accelerometer",
      "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "navigator.accelerometer"
      ]
    },
    {
      "id": "cordova-plugin-shake.Shake",
      "file": "plugins/cordova-plugin-shake/www/shake.js",
      "pluginId": "cordova-plugin-shake",
      "clobbers": [
        "shake"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-camera-preview": "0.11.1",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-shake": "0.7.0",
    "cordova-plugin-vibration": "3.1.1",
    "cordova-plugin-whitelist": "1.3.4"
  };
});