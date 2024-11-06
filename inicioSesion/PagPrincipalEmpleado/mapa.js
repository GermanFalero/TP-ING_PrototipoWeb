
const map = L.map('map').setView([-34.6037, -58.3816], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Datos de los centros médicos por zona
const centrosPorZona = {
    "Zona 1": [
        { nombre: "Centro Médico 1", coordenadas: [-34.600, -58.380], direccion: "Dirección 1", descripcion: "Descripción del Centro Médico 1" },
        { nombre: "Centro Médico 2", coordenadas: [-34.605, -58.390], direccion: "Dirección 2", descripcion: "Descripción del Centro Médico 2" },
    ],
    "Zona 2": [
        { nombre: "Centro Médico 3", coordenadas: [-34.610, -58.375], direccion: "Dirección 3", descripcion: "Descripción del Centro Médico 3" },
        { nombre: "Centro Médico 4", coordenadas: [-34.615, -58.385], direccion: "Dirección 4", descripcion: "Descripción del Centro Médico 4" },
    ],
};

// Elementos DOM
const zoneSelector = document.getElementById('zoneSelector');
const zoneList = document.getElementById('zoneList');
const centerSelector = document.getElementById('centerSelector');
const centerList = document.getElementById('centerList');
const centerInfoBox = document.getElementById('centerInfoBox');

// Evento para mostrar opciones de zonas
zoneSelector.addEventListener('click', () => {
    zoneList.style.display = zoneList.style.display === 'none' ? 'block' : 'none';
});

// Evento para seleccionar una zona y mostrar sus centros
zoneList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const zonaSeleccionada = event.target.textContent;
        zoneSelector.querySelector('.selected-zone').textContent = zonaSeleccionada;
        zoneList.style.display = 'none';
        centerSelector.style.display = 'block';
        centerList.innerHTML = ''; 

        // Agregar centros de la zona seleccionada
        centrosPorZona[zonaSeleccionada].forEach(centro => {
            const centroItem = document.createElement('li');
            centroItem.className = "center-box";  
            centroItem.textContent = centro.nombre;
            centroItem.dataset.lat = centro.coordenadas[0];
            centroItem.dataset.lng = centro.coordenadas[1];
            centroItem.dataset.direccion = centro.direccion;
            centroItem.dataset.descripcion = centro.descripcion;
            centerList.appendChild(centroItem);
        });

        // Ocultar cuadro de información al cambiar de zona
        centerInfoBox.style.display = 'none';
    }
});

// Evento para seleccionar y mostrar un centro en el mapa
centerList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const lat = event.target.dataset.lat;
        const lng = event.target.dataset.lng;
        const direccion = event.target.dataset.direccion;
        const descripcion = event.target.dataset.descripcion;
        
        // Centrar el mapa en el nuevo marcador y borrar el anterior
        map.setView([lat, lng], 14);
        L.marker([lat, lng]).addTo(map)
            .bindPopup(event.target.textContent)
            .openPopup();

        // Mostrar la información del centro en el cuadro de información
        centerInfoBox.innerHTML = `
            <h5>${event.target.textContent}</h5>
            <p>Dirección: ${direccion}</p>
            <p>${descripcion}</p>
            <button class="report-button" onclick="consultarReportes()">Consultar Reportes</button>
        `;
        centerInfoBox.style.display = 'block';
    }
});


//function consultarReportes() {
  //  alert("Redirigiendo a los reportes del centro seleccionado...");
  //  window.location.href = "reportes.html"; 
//}