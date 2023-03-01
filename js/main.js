document.addEventListener("DOMContentLoaded", () => {
  //* VARIABLES
  const flores = document.querySelector("#flower");
  // const naturaleza=document.querySelector("#nature")
  const div = document.querySelector("#pintar");
  const enlaces = document.querySelector(".enlaces");
  const formulario = document.querySelector("#formulario");
  const texto = document.querySelector("#texto");
  const botones = document.querySelector("#botones");
  

  //* EVENTOS

  document.addEventListener(`submit`, (ev) => {
    ponerId();
  });

  document.addEventListener(`click`, ({target}) => {

        if(target.matches(`#mas`)){
                
            pasarPaginas(target.id);
        }
        if (target.matches(`#menos`)) {
            pasarPaginas(target.id);
          
        }
  });

  const init = () => {

    const url = location.search;

    let params = new URLSearchParams(url);

    if (params.has("id")) {

      const id = params.get("id");

      const page=params.get("page");

      pintarBotones();
      

      pintarFotos(id,page);

    } else {
      console.log("yoquese");
    }
  };

  //* FUNCIONES

  const ponerId = () => {
    formulario.action = `busqueda.html?id=${texto.value}page=${page}`;
  };

  const consulta = async (busqueda, page) => {
    console.log(page);
    try {
      let peticion = await fetch(
        `https://api.pexels.com/v1/search?query=${busqueda}&per_page=20&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "AF47xNz2Dq7rUjCuFzlGjs0eUuIQI87nopfo6HwwFypgZTSOZJdqEHC1",
          },
        }
      );

      if (peticion.ok) {
        const respuesta = await peticion.json();
        return respuesta;
      } else throw `error en la ejecucion`;
    } catch (error) {
      return error;
    }
  };

 const pasarPaginas= (pagina)=>{
    let page =1
    if(pagina=="mas"){
         page ++
    }else if(pagina=="menos"){
         page --
    }
   
  }

  const pintarFotos = async (id,page) => {

    // let paginacion=  pasarPaginas()
    // console.log(paginacion);

    const fotos = await consulta(id,page);
    // fotos.page=7
    console.log(fotos);
    const arrayfotos = fotos.photos;
    arrayfotos.forEach(({ src }) => {
      let img = document.createElement("img");
      img.src = src.tiny;
      div.append(img);
    }); 
    
    // return fotos.next_page

  };
 

  const pintarBotones = async (page) => {

    // const pasarpaginas= await pintarFotos()
    // console.log(pasarpaginas);

    let botonFlechaMas = document.createElement("button");
    botonFlechaMas.id="mas"
     botonFlechaMas.textContent = " >>";

    let boton1 = document.createElement("button");
    boton1.textContent =1;

    let botonFlechaMenos = document.createElement("button");
    botonFlechaMenos.id="menos"
    botonFlechaMenos.textContent = "<< ";
    

    botones.append(botonFlechaMenos, boton1, botonFlechaMas);
  };


  console.log(page);
  init();
}); //LOAD
