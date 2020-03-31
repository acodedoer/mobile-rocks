const MODEL = "https://teachablemachine.withgoogle.com/models/Nt7h5AYH/" + "model.json";

function loadClassificationModel(){
    classifier = ml5.imageClassifier(MODEL, ()=>(console.log("Model loaded")));
}

function kickstartClassifier(){
    let image = document.getElementById('captured-image');
    return new Promise(resolve => {
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAoSURBVEhL7cwxEQAgAAMx/JsuC/cO2BIBOftEHHHEEUccccQRR/xsF60QlugBZnhUAAAAAElFTkSuQmCC'
    classifier.classify(image, (err, results) => {
            if(err){
                reject("error")
            }
            else {
                resolve(results)
            }
        }); 
    });
}