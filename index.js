let catalogo="";


let selecCervezas = document.getElementById("nuestrasCervezas");
let nuestrasCervezas;
let opcionCerveza;
let tuCerveza;
let boton="";
let comparaCerveza;
let cerveza;


//Sección para comunicarse con la url y manejar los datos de la API


fetch (`https://api.punkapi.com/v2/beers`).then (function (respuesta){
    return respuesta.json();

}).then (function(datos){
    console.log(datos);

    for (let i=0; i<datos.length; i++) {
        
        catalogo += `
            <div> 
                <img src=${datos[i].image_url} alt=""/>
                <p> <b>${datos[i].name} </p>
                <br>
            </div>`;
    }

        document.getElementById("catalogo").innerHTML=catalogo;
})






//Sección para definir el menú desplegable con todas las cervezas y que se pueda seleccionar una.


fetch (`https://api.punkapi.com/v2/beers`).then (function (respuesta){ //Llamo a la url
    return respuesta.json();
    console.log(respuesta);                                            //Cojo la respuesta de la url con los datos que nos proporciona

}).then (function(datos){
    nuestrasCervezas = datos.results;
    for (let i=0; i<datos.length; i++) {                                //Paso los nombres de las cervezas al menú desplegable del HTML (SELECT)
        let opcionCerveza = `<option> ${datos[i].name}</option>`;
        selecCervezas.innerHTML += opcionCerveza;
    }
    
})

function mostrarInfoCerveza() {                                          //Llamo a la función con la opción seleccionada en el menú SELECT del HTML
    nuestrasCervezas = document.getElementById("nuestrasCervezas");
    let tuCerveza = nuestrasCervezas.value;                              //Paso a "tuCerveza" el valor de la opción seleccionada en el menu SELECT
    console.log(tuCerveza);
    fetch(`https://api.punkapi.com/v2/beers`).then (function (respuesta){//Vuelvo a hacer la llamada a la url para solicitar todos los datos
        return respuesta.json();

    }).then (function(datos){
        nuestrasCervezas = datos.results;
        for (let i=0; i<datos.length; i++) {                             //Ciclo for para comparar los datos recibidos de la url con la opción elegida en el SELECT

            comparaCerveza = datos[i].name;
            console.log(comparaCerveza);

            if (comparaCerveza === tuCerveza) {
                cerveza = `
                <div> 
                    <img src= ${datos[i].image_url} alt="" width=90px/>
                    <br>
                    <p>NOMBRE: ${datos[i].name} </p>
                    <br>
                    <p>ALCOHOL: ${datos[i].abv} % Vol </p>
                    <br>
                    <p> DESCRIPCIÓN: ${datos[i].description} </p>
                    <br>
                    <p> MARIDAJE: ${datos[i].food_pairing} </p>
                    <br>
                    <p> EL MAESTRO CERVECERO COMENTA: ${datos[i].brewers_tips} </p>
                </div>`;

            }
            document.getElementById("cerveza").innerHTML=cerveza;
        }
    })


}

