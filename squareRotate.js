var gl;
var points = [];
var colors = [];
var numVertices = 36;
var theta;
var axis =[];

window.onload = function init()
{
	initButtons();


    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    makeCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.enable(gl.DEPTH_TEST)

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    thetaLoc= gl.getUniformLocation(program, "theta");
    theta =[0,0,0];
    axis =[vec4(-1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.0, -1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, -1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    ];

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    var colorId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, colorId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();
};


function render() {


    gl.uniform3fv(thetaLoc, theta);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, 36 );
}

function makeCube(){

	quad(0,3,2,1);
	quad(2,3,7,6);
	quad(0,4,7,3);
	quad(1,2,6,5);
	quad(4,5,6,7);
	quad(0,1,5,4);

}

function quad(a,b,c,d){

  var indices= [a,b,c,a,c,d];


      var vertices = [
          [ -0.5, -0.5,  0.5, 1.0 ],
          [ -0.5,  0.5,  0.5, 1.0 ],
          [  0.5,  0.5,  0.5, 1.0 ],
          [  0.5, -0.5,  0.5, 1.0 ],
          [ -0.5, -0.5, -0.5, 1.0 ],
          [ -0.5,  0.5, -0.5, 1.0 ],
          [  0.5,  0.5, -0.5, 1.0 ],
          [  0.5, -0.5, -0.5, 1.0 ]
      ];

      var vertexColors = [
          [ 0.0, 0.0, 0.0, 1.0 ],  // black
          [ 1.0, 0.0, 0.0, 1.0 ],  // red
          [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
          [ 0.0, 1.0, 0.0, 1.0 ],  // green
          [ 0.0, 0.0, 1.0, 1.0 ],  // blue
          [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
          [ 1.0, 1.0, 1.0, 1.0 ],  // cyan
          [ 0.0, 1.0, 1.0, 1.0 ]   // white
    ];

  for(var i = 0; i<indices.length; i++){
	       points.push(vertices[indices[i]])
	       colors.push(vertexColors[d])
   }
}

function initButtons(){


   $("#btnX").click(function() {
     theta[0] += 10;
     render();
     });
   $("#btnY").click(function() {
	      theta[1] += 10;
	      render();
     });
   $("#btnZ").click(function() {
	      theta[2] += 10;
	      render();
     });

}



