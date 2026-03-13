async function cargarVista(ruta) {
    const res = await fetch(ruta);
    return await res.text();
}

async function iniciar() {

    const navbar = await cargarVista("views/navbar.html");
    document.getElementById("navbar").innerHTML = navbar;

    crearMenu();
    crearSecciones();
    //mostrarSeccion(secciones[0].recursos[0].id);
    mostrarSeccion("intro");
}

function crearMenu() {

    const menu = document.getElementById("menu");

    secciones.forEach(fase => {

        let items = "";

        fase.recursos.forEach(recurso => {

            items += `
            <li>
                <a class="dropdown-item" href="#" onclick="mostrarSeccion('${recurso.id}')">
                ${recurso.titulo}
                </a>
            </li>
            `;

        });

        menu.innerHTML += `
        <li class="nav-item dropdown">

            <a class="nav-link dropdown-toggle"
               href="#"
               role="button"
               data-bs-toggle="dropdown">

               ${fase.titulo}

            </a>

            <ul class="dropdown-menu">
                ${items}
            </ul>

        </li>
        `;

    });

}

function crearSecciones() {

    const contenido = document.getElementById("contenido");

    secciones.forEach((fase, faseIndex) => {

        fase.recursos.forEach((recurso, recursoIndex) => {

            let slides = "";

            recurso.imagenes.forEach((imagen, i) => {

                slides += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">

            <img src="${imagen.src}" class="d-block w-100">

            <div class="carousel-caption d-none d-md-block">
            <p>${imagen.texto}</p>
            </div>

            </div>
            `;

            });

            const carouselId = `carousel-${faseIndex}-${recursoIndex}`;

            contenido.innerHTML += `
            <section id="${recurso.id}" class="seccion mb-5">

                <h2 class="text-center">${fase.titulo}</h2>
                <h4 class="text-center mb-4">${recurso.titulo}</h4>

                <div id="${carouselId}" class="carousel slide">

                    <div class="carousel-inner">
                        ${slides}
                    </div>

                    <button class="carousel-control-prev"
                        type="button"
                        data-bs-target="#${carouselId}"
                        data-bs-slide="prev">

                        <span class="carousel-control-prev-icon"></span>

                    </button>

                    <button class="carousel-control-next"
                        type="button"
                        data-bs-target="#${carouselId}"
                        data-bs-slide="next">

                        <span class="carousel-control-next-icon"></span>

                    </button>

                </div>

            </section>
            `;

        });

    });

}

function mostrarSeccion(id) {

    document.querySelectorAll("#contenido section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "block";

}

iniciar();