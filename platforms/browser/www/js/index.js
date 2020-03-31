var app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        loadClassificationModel();
        setupPhaserGame();
    }
};

app.initialize();


function takePictureAndClassify(){
    let image = document.getElementById('captured-image');
    return new Promise(resolve => {
        CameraPreview.takeSnapshot({quality: 30}, function(base64PictureData){
            imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
            image.src = imageSrcData;
            let canvas=document.getElementById('canvas');
            let ctx=canvas.getContext("2d");
            let img=new Image();
            img.onload=function(){
                crop();
            }
            img.src=document.getElementById('captured-image').src;
            canvas.height = window.screen.height/3
            canvas.width = window.screen.height/3
    
            function crop(){
                ctx.drawImage(img,0, (img.height-image.width)/2, img.width, image.width,0, 0, canvas.width, canvas.height);
                document.getElementById("cropped").src=canvas.toDataURL();
            }

            classifier.classify(document.getElementById("cropped"), (err, results) => {
                if(err){
                    reject("error")
                }
                else {
                    resolve(results)
                }
            });
        })  
    });
}