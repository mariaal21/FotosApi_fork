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
        if(target=`mas`){
            console.log(target);
        }
        else if (target=`menos`) {
            console.log(target);
        }
  });

  const init = () => {

    const url = location.search;

    let params = new URLSearchParams(url);

    if (params.has("id")&&params.has("page")) {

      const id = params.get("id");
      const page=params.get("page");

      pintarBotones(page);

      pintarFotos(id);

    } else {
      console.log("yoquese");
    }
  };

  //* FUNCIONES

  const ponerId = () => {
    formulario.action = `busqueda.html?id=${texto.value}&page=99`;
  };

  const consulta = async (busqueda, page) => {
    try {
      let peticion = await fetch(
        `https://api.pexels.com/v1/search?query=${busqueda}&per_page=15&page=${page}`,
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

  const pintarFotos = async (id) => {

    const fotos = await consulta(id);
    fotos.page=5
    console.log(fotos);
    const arrayfotos = fotos.photos;
    arrayfotos.forEach(({ src }) => {
      let img = document.createElement("img");
      img.src = src.tiny;
      div.append(img);
    }); 
    
    return fotos.next_page

  };

  const pintarBotones = async (page) => {

    const pasarpaginas= await pintarFotos()
    // console.log(pasarpaginas);

    let botonFlechaMas = document.createElement("button");
    
    let boton1 = document.createElement("button");
    let botonFlechaMenos = document.createElement("button");
    boton1.textContent = page;
    botonFlechaMas.textContent = " >>";
    botonFlechaMenos.textContent = "<< ";
   
    botones.append(botonFlechaMenos, boton1, botonFlechaMas);
  };

  init();
}); //LOAD
