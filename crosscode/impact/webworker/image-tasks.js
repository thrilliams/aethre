

function WORKER_IMAGE_SCALE(data){
    var srcData = data.src;
    var destData = data.dest;

    var width = srcData.width;
    var widthScaled = destData.width;
    var heightScaled = destData.height;

    var scale = data.scale;
    for( var y = 0; y < heightScaled; y++ ) {
        for( var x = 0; x < widthScaled; x++ ) {
            var index = (Math.floor(y / scale) * width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            destData.data[ indexScaled ] = srcData.data[ index ];
            destData.data[ indexScaled+1 ] = srcData.data[ index+1 ];
            destData.data[ indexScaled+2 ] = srcData.data[ index+2 ];
            destData.data[ indexScaled+3 ] = srcData.data[ index+3 ];
        }
    }
    return {result: destData};
}

function WORKER_IMAGE_MONOCHROME(data){
    var srcData = data.src;
    var destData = data.dest;
    var fr = data.factorRed;
    var fg = data.factorGreen;
    var fb = data.factorBlue;
    var add = data.colorAdd;


    var size = srcData.width*destData.height*4;

    for(var i = 0; i < size; i+=4){
        var grayScale = (srcData.data[i] + srcData.data[i+1] + srcData.data[i+2]) / 3;
        destData.data[i] = grayScale*fr + add;
        destData.data[i+1] = grayScale*fg + add;
        destData.data[i+2] = grayScale*fb + add;
        destData.data[i+3] = srcData.data[i+3];
    }
    return {result: destData};
}

if(self){
    var WORKER = {};
}
else{
    if(!window.WORKER)
        var WORKER = {}
}
WORKER.IMAGE = {
    SCALE : WORKER_IMAGE_SCALE,
    MONOCHROME: WORKER_IMAGE_MONOCHROME
};


self.onmessage = function(event) {
    for(var i in WORKER.IMAGE){
        if(i == event.data._type){
            var id = event.data._id;
            delete event.data._id;
            delete event.data._type;
            var result = WORKER.IMAGE[i](event.data);
            result._id = id;
            self.postMessage( result);
            return;
        }
    }
    self.postMessage({error: "TASK NOT FOUND"});
};

