//---

let mobile = false;

//---

let canvasWidth = 0;
let canvasHeight = 0;

//---

let canvas = null;
let ctx = null;
let imageData = null;
let pix = null;

//---

let animationFrame = null;

//---

let fullscreenMode = false;
let pictureFrameMode = true;

//---

const MATHPI180 = Math.PI / 180;
const MATHPI2 = Math.PI * 2;

//---

let center = null;

let mouseActive = false;
let mouseDown = false;
let mousePos = null

//---

let rotationSpeed = -1.00;
let rotationSpeedFactor = { x: 0, y: 0 };

let fov = 300;
const fovMin = 210;
const fovMax = fov;

let starHolderCount = 6666;
let starHolder = [];
let starBgHolder = [];
let starSpeed = 20;
let starSpeedMin = starSpeed;
let starSpeedMax = 200;
let starDistance = 8000;
let starRotation = 0;

const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };

let colorInvertValue = 0;

//---

function init() {
	
	if ( isMobile.phone || isMobile.tablet ) {

		mobile = true;

	}
	
	//---
	
	document.querySelector( '.button-fullscreen' ).addEventListener( 'click', clickFullscreenHandler, false );
	document.querySelector( '.button-pictureframe' ).addEventListener( 'click', clickPictureFrameHandler, false );
	
	//---
	
	canvas = document.querySelector( 'canvas' );
	canvas.oncontextmenu = ( event ) => {
		
		event.preventDefault();
		
	};

	if ( !mobile ) {    

		canvas.addEventListener( 'mousemove', mouseMoveHandler );
		canvas.addEventListener( 'mousedown', mouseDownHandler );
		canvas.addEventListener( 'mouseup', mouseUpHandler );
		canvas.addEventListener( 'mouseenter', mouseEnterHandler ); 
		canvas.addEventListener( 'mouseleave', mouseLeaveHandler ); 

	} else {

		canvas.addEventListener( 'touchstart', touchStartHandler, false );
		canvas.addEventListener( 'touchend', touchEndHandler, false );
		canvas.addEventListener( 'touchmove', touchMoveHandler, false );
		canvas.addEventListener( 'touchcancel', touchCancelHandler, false );

	}
	
	ctx = canvas.getContext( '2d' );
	
	//---
	
	window.addEventListener( 'resize', onResize, false );
	
	restart();

}

function onResize( event ) {
    
  restart();

}

function restart() {
	
	if ( fullscreenMode === true ) {
		
		canvasWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		canvasHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		canvas.style.position = 'fixed';
		canvas.style.left = '0';
		canvas.style.top = '0';
		
	} else {
		
		const canvasWrapper = document.querySelector( '.canvas' );

		canvasWidth = Math.floor( canvasWrapper.clientWidth );
		canvasHeight = Math.floor( canvasWrapper.clientHeight );

		canvas.style.position = 'initial';
		
	}
	
	//---
	
	// if ( pictureFrameMode === true ) {

	// } else {

	// }
	
	//---
	
	canvas.width = canvasWidth;
  canvas.height = canvasHeight;

	canvas.style.width = `${ canvasWidth }px`;
	canvas.style.height = `${ canvasHeight }px`;
	
	//---
	
	imageData = ctx.getImageData( 0, 0, canvasWidth, canvasHeight );
	pix = imageData.data;
	
	//---
	
	center = { x: canvas.width / 2, y: canvas.height / 2 };
	
	mousePos = { x: center.x, y: center.y };
	
	rotationSpeedFactor.x = rotationSpeed / center.x;
	rotationSpeedFactor.y = rotationSpeed / center.y;
	
	//---
	
	starBgHolder = [];
	starHolder = [];
	
	addParticles();
	
	//---
	
	if ( animationFrame !== null ) {
  
  	cancelAnimFrame( animationFrame );
  
  }
 	
	render();
	
}

//---

function clearImageData() {

	for ( let i = 0, l = pix.length; i < l; i += 4 ) {

		pix[ i ] = backgroundColor.r;
		pix[ i + 1 ] = backgroundColor.g;
		pix[ i + 2 ] = backgroundColor.b;
		pix[ i + 3 ] = backgroundColor.a;

	}

};

function setPixel( x, y, r, g, b, a ) {

	const i = ( x + y * canvasWidth ) * 4;

	pix[ i ]     = r;
	pix[ i + 1 ] = g;
	pix[ i + 2 ] = b;
	pix[ i + 3 ] = a;

};

function setPixelAdditive( x, y, r, g, b, a ) {

	const i = ( x + y * canvasWidth ) * 4;

	pix[ i ]     = pix[ i ]     + r;
	pix[ i + 1 ] = pix[ i + 1 ] + g;
	pix[ i + 2 ] = pix[ i + 2 ] + b;
	pix[ i + 3 ] = a;

};

//---

function drawLine( x1, y1, x2, y2, r, g, b, a ) {

	const dx = Math.abs( x2 - x1 );
	const dy = Math.abs( y2 - y1 );

	const sx = ( x1 < x2 ) ? 1 : -1;
	const sy = ( y1 < y2 ) ? 1 : -1;

	let err = dx - dy;

	let lx = x1;
	let ly = y1;    

	while ( true ) {

		if ( lx > 0 && lx < canvasWidth && ly > 0 && ly < canvasHeight ) {

			setPixel( lx, ly, r, g, b, a );

		}

		if ( lx === x2 && ly === y2 ) {
			
			break;
			
		}
			
		const e2 = 2 * err;

		if ( e2 > -dx ) { 

			err -= dy; 
			lx += sx; 

		}

		if ( e2 < dy ) { 

			err += dx; 
			ly += sy; 

		}

	}

};

//---

function addParticle( x, y, z, ox, oy, oz ) {

	return {
		
		x: x,
		y: y,
		z: z,
		ox: ox,
		oy: oy,
		x2d: 0,
		y2d: 0,
		
	};

};

function addParticles() {

	let i;

	let x, y, z;

	let colorValue;
	let particle;

	for ( i = 0; i < starHolderCount / 3; i++ ) {

		x = Math.random() * 24000 - 12000;
		y = Math.random() * 4500 - 2250;
		z = Math.round( Math.random() * starDistance );

		colorValue = Math.floor( Math.random() * 55 ) + 5;

		particle = addParticle( x, y, z, x, y, z );
		particle.color = { r: colorValue, g: colorValue, b: colorValue, a: 255 };

		starBgHolder.push( particle );

	}

	for ( i = 0; i < starHolderCount; i++ ) {

		x = Math.random() * 10000 - 5000;
		y = Math.random() * 10000 - 5000;
		z = Math.round( Math.random() * starDistance );

		colorValue = Math.floor( Math.random() * 155 ) + 100;

		particle = addParticle( x, y, z, x, y, z );
		particle.color = { r: colorValue, g: colorValue, b: colorValue, a: 255 };
		particle.oColor = { r: colorValue, g: colorValue, b: colorValue, a: 255 };
		particle.w = 1;
		particle.distance = starDistance - z;
		particle.distanceTotal = Math.round( starDistance + fov - particle.w );

		starHolder.push( particle );

	}

};

//---

window.requestAnimFrame = ( function() {

    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame

} )();

window.cancelAnimFrame = ( function() {

    return  window.cancelAnimationFrame       ||
            window.mozCancelAnimationFrame;

} )();

//---

function render() {

	clearImageData();

	//---

	let i, j, l, k, m, n;

	//---

	let rx, rz;

	let star;
	let scale;

	//---

	if ( mouseActive ) {

		starSpeed += 2;

		if ( starSpeed > starSpeedMax ) {
			
			starSpeed = starSpeedMax;
			
		}
			
	} else {

		starSpeed -= 1;

		if ( starSpeed < starSpeedMin ) {
			
			starSpeed = starSpeedMin;
			
		}
			
	}

	//---

	if ( !mouseActive ) {

		fov += 0.5;

		if ( fov > fovMax ) {
			
			fov = fovMax;
			
		}
			

	} else {

		fov -= 1;

		if ( fov < fovMin ) {
			
			fov = fovMin;
			
		}
			
	}

	//---

	let warpSpeedValue;

	if ( mobile ) {

		warpSpeedValue = starSpeed * ( starSpeed / starSpeedMax );

	} else {

		warpSpeedValue = starSpeed * ( starSpeed / ( starSpeedMax / 2 ) );

	}

	//---

	for ( i = 0, l = starBgHolder.length; i < l; i++ ) {

		star = starBgHolder[ i ];

		scale = fov / ( fov + star.z ); 

		star.x2d = ( star.x * scale ) + center.x; 
		star.y2d = ( star.y * scale ) + center.y; 

		if ( star.x2d > 0 && star.x2d < canvasWidth && star.y2d > 0 && star.y2d < canvasHeight ) {

			setPixel( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

		}

	}

	//---

	for ( i = 0, l = starHolder.length; i < l; i++ ) {

		star = starHolder[ i ];

		star.z -= starSpeed;
		star.distance += starSpeed;

		if ( star.z < -fov + star.w ) {

			star.z = starDistance;
			star.distance = 0;

		} 

		//---
		//star color

		const distancePercent = star.distance / star.distanceTotal;

		star.color.r = Math.floor( star.oColor.r * distancePercent );
		star.color.g = Math.floor( star.oColor.g * distancePercent );
		star.color.b = Math.floor( star.oColor.b * distancePercent );

		//---
		//star draw

		scale = fov / ( fov + star.z ); 

		star.x2d = ( star.x * scale ) + center.x; 
		star.y2d = ( star.y * scale ) + center.y; 

		if ( star.x2d > 0 && star.x2d < canvasWidth && star.y2d > 0 && star.y2d < canvasHeight ) {

			setPixelAdditive( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

		}

		if ( starSpeed != starSpeedMin ) {

			const nz = star.z + warpSpeedValue;

			scale = fov / ( fov + nz ); 

			const x2d = ( star.x * scale ) + center.x; 
			const y2d = ( star.y * scale ) + center.y; 

			if ( x2d > 0 && x2d < canvasWidth && y2d > 0 && y2d < canvasHeight ) {

				drawLine( star.x2d | 0, star.y2d | 0, x2d | 0, y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

			}

		}

		if ( mouseDown ) {

			//rotation
			const radians = MATHPI180 * starRotation;

			const cos = Math.cos( radians );
			const sin = Math.sin( radians );

			star.x = ( cos * ( star.ox - center.x ) ) + ( sin * ( star.oy - center.y ) ) + center.x,
			star.y = ( cos * ( star.oy - center.y ) ) - ( sin * ( star.ox - center.x ) ) + center.y;

		}

	}

	//---

	ctx.putImageData( imageData, 0, 0 );

	//---

	if ( mouseActive ) {

		center.x += ( mousePos.x - center.x ) * 0.015;
		center.y += ( mousePos.y - center.y ) * 0.015;

	} else {

		center.x += ( ( canvasWidth / 2 ) - center.x ) * 0.015;
		center.y += ( ( canvasHeight / 2 ) - center.y ) * 0.015;

	}

	//---

	if ( mouseDown ) {

		starRotation -= 0.5;

	}
	
	//---
	
	animationFrame = requestAnimFrame( render );

};

//---

function mouseMoveHandler( event ) {

	mousePos = getMousePos( canvas, event );

};

function mouseEnterHandler( event ) {

	mouseActive = true;

};

function mouseLeaveHandler( event ) {

	mouseActive = false;

	mouseDown = false;

};

function mouseDownHandler( event ) {

	mouseDown = true;

	speed = 0;

};

function mouseUpHandler( event ) {

	mouseDown = false;

	speed = 0.25;

};

//---

function getMousePos( canvas, event ) {

	var rect = canvas.getBoundingClientRect();

	return { x: event.clientX - rect.left, y: event.clientY - rect.top };

};

//---

function touchStartHandler( event ) {

	event.preventDefault();

	mouseDown = true;
	mouseActive = true;

};

function touchEndHandler( event ) {

	event.preventDefault();

	mouseDown = false;
	mouseActive = false;

};

function touchMoveHandler( event ) {

	event.preventDefault();

	mousePos = getTouchPos( canvas, event );

};

function touchCancelHandler( event ) {

	mouseDown = false;
	mouseActive = false;

};

//---

function getTouchPos( canvas, event ) {

	var rect = canvas.getBoundingClientRect();

	return { x: event.touches[ 0 ].clientX - rect.left, y: event.touches[ 0 ].clientY - rect.top };

};

//---

function clickFullscreenHandler( event ) {
	
	const status = event.target.innerText.toLowerCase() !== 'off';

	toggleFullscreenMode( status, event.target );
	togglePictureFrameMode( false, document.querySelector( '.button-pictureframe' ) );
	
	restart();

}

function clickPictureFrameHandler( event ) {
	
	const status = event.target.innerText.toLowerCase() !== 'off';
	
	togglePictureFrameMode( status, event.target );
	toggleFullscreenMode( true, document.querySelector( '.button-fullscreen' ) );
	
	restart();
	
}

//---

function toggleFullscreenMode( status, target ) {

	const info = document.querySelector( '.info' );
	
	if ( status === true ) {
		
		target.innerHTML = '<strong>Off</strong>';
		
		fullscreenMode = false;

		info.style.position = 'absolute';
		info.style.right = '0';
		info.style.bottom = '-50px';

	} else {
		
		target.innerHTML = '<strong>On</strong>';
		
		fullscreenMode = true;
		
		info.style.position = 'fixed';
		info.style.right = '10px';
		info.style.bottom = '10px';
		
	}
	
}

function togglePictureFrameMode( status, target ) {

	const c = document.querySelector( '.canvas' );
	
	if ( status === true ) {
		
		target.innerHTML = '<strong>Off</strong>';
		
		pictureFrameMode = false;
		
		c.classList.remove( 'border-image' );
		
		backgroundColor.a = 0;

	} else {
		
		target.innerHTML = '<strong>On</strong>';
		
		pictureFrameMode = true;
		
		c.classList.add( 'border-image' );
		
		backgroundColor.a = 255;

	}
	
}

//---

document.addEventListener( 'DOMContentLoaded', () => {
    
  init();

} );

//---