function setupCamera(position ="top", startX= (window.innerWidth - (window.screen.height/3.2))/2, startY=10, width = window.screen.height/3.2, height = window.screen.height/3.2){

    let posY
    if (position=="top"){
        posY = 210*(window.innerWidth/1440)
    }
    else{
        posY = window.screen.height/2
    }

    let options = {
        x: startX,
        y: posY,
        width: width,
        height: height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: true,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false
    };
        
    CameraPreview.startCamera(options);
    CameraPreview.show()
}