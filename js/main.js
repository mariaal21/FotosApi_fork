
document.addEventListener('DOMContentLoaded', () => {

    //* VARIABLES
    const flores = document.querySelector("#flower")
    // const naturaleza=document.querySelector("#nature")
    const div = document.querySelector("#pintar")
    const enlaces = document.querySelector(".enlaces")
    const formulario=document.querySelector("#formulario")
    const texto=document.querySelector("#texto")

    
    //* EVENTOS      



    const ponerId=()=>{
         formulario.action =`busqueda.html?id=${texto.value}`
    }

 
    
    console.log(formulario);

    document.addEventListener(`submit`, (ev) => {
            ponerId()
        }

    )

    const init = () => {

        const url = location.search

        let params = new URLSearchParams(url);


        if (params.has('id')) {

            const id = params.get('id')
            
            pintarFotos(id)


        } else {
            console.log("yoquese");
        }

    }




    //* FUNCIONES  


    const consulta = async (busqueda, page) => {
      
        try {

            let peticion = await fetch(`https://api.pexels.com/v1/search?query=${busqueda}&per_page=15&page=${page}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'AF47xNz2Dq7rUjCuFzlGjs0eUuIQI87nopfo6HwwFypgZTSOZJdqEHC1'
                },
            })

            if (peticion.ok) {
                const respuesta = await peticion.json()
                // console.log(respuesta);

                return respuesta


            } else throw `error en la ejecucion`


        } catch (error) {
            return error;
        }
    }


    const pintarFotos = async (id,) => {

        const fotos = await consulta(id, 2)
        const arrayfotos = fotos.photos

        console.log(arrayfotos);

        arrayfotos.forEach(({ src }) => {
            let img = document.createElement("img")
            img.src = src.tiny
            div.append(img)
        });

    }


  





init()


})//LOAD

