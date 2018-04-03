var hangMan  = (function(){ 
    var arrayMatrix       =  ["computadoras", "javascript", "servidor"];
    var palabraSecreta    =  arrayMatrix[getRandomInt( 0, arrayMatrix.length - 1 )];
    var inputs 		      =  palabraSecreta.length;
    var docFragment 	  =  document.createDocumentFragment();
    var containerInputs   =  document.getElementById( 'inputs' );
    var reload            =  document.getElementById( 'recargar' );
    var intentosRestantes =  document.getElementById('intentos');
    var intentos          =  inputs + 10;

    /**
     * 
     * @param {event} e 
     * 
     * Event function : handles correct and incorrect words
     */
    var handleButton = function(e){
        var id = Number( e.target.getAttribute("id") );
        intentosRestantes.textContent = intentos;
        
        if ( intentos === 0 ){
          alert("perdiste");
          location.reload( this );
        } else {
            if ( intentos > 0 ){
                var array    = Array.prototype.slice.call( containerInputs.children );
                var values   = array.map( el => el.value );
                var arrToStr = values.join( "" );
                
                if ( arrToStr == palabraSecreta ){
                    alert("ganaste");
                    location.reload( true );
                }
            }
        }
        
        if ( e.target.value === palabraSecreta[id] ){
            e.target.classList.remove('bad');
            e.target.classList.add('correct');
        } else {
            e.target.classList.add('bad');
            intentos--;
        }
    }

    /** 
     * handles reload button
    */
    var handleReload = function(){
        window.location.reload(true);
    };

    /**
     * 
     * @param {min number} min 
     * @param {max number} max
     * 
     * returns a random number betwen min and max 
     */
    function getRandomInt(min, max) {
        return Math.floor( Math.random( ) * ( max - min + 1 ) + min );
    };

    return {
        init : function(){
            intentosRestantes.textContent = intentos;
        
            for(var input = 1; input <= inputs ; input++){
                var wordInput = document.createElement("input");
                wordInput.setAttribute("maxlength", "1");
                wordInput.setAttribute("id", input - 1);
                
                if( getRandomInt( 1, 3 ) == 2 ){
                    wordInput.value = palabraSecreta[input - 1];
                    wordInput.setAttribute("disabled", "disabled");
                }
                docFragment.appendChild( wordInput );
            }

            containerInputs.appendChild( docFragment );

            //attach events 
            containerInputs.addEventListener('keyup', handleButton);
            reload.addEventListener('click', handleReload);
        }
    }
})();

DomReady.ready(function() { 
    hangMan.init();
});



