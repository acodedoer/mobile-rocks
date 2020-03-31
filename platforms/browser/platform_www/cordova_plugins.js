cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-camera-preview/www/CameraPreview.js",
        "id": "cordova-plugin-camera-preview.CameraPreview",
        "pluginId": "cordova-plugin-camera-preview",
        "clobbers": [
            "CameraPreview"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "id": "cordova-plugin-device-motion.Acceleration",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "id": "cordova-plugin-device-motion.accelerometer",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/src/browser/AccelerometerProxy.js",
        "id": "cordova-plugin-device-motion.AccelerometerProxy",
        "pluginId": "cordova-plugin-device-motion",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-shake/www/shake.js",
        "id": "cordova-plugin-shake.Shake",
        "pluginId": "cordova-plugin-shake",
        "clobbers": [
            "shake"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-camera-preview": "0.11.1",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-shake": "0.7.0",
    "cordova-plugin-whitelist": "1.3.4"
}
// BOTTOM OF METADATA
});