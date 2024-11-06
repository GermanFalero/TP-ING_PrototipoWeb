

// mostrar la encuesta al hacer clic
document.getElementById('showSurveyBtn').addEventListener('click', function() {
    const surveyForm = document.getElementById('surveyForm');
    surveyForm.style.display = surveyForm.style.display === 'none' ? 'block' : 'none';
});

// envio de formulario
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const scores = [];
    for (let i = 1; i <= 10; i++) {
        scores.push(document.getElementById(`q${i}`).value); 
    }
    const comment = document.getElementById('comment').value; 
    alert(`Puntuaciones: ${scores.join(', ')}\nComentario: ${comment}`);

    
    this.style.display = 'none'; // Oculta el formulario
    const showSurveyBtn = document.getElementById('showSurveyBtn');
    showSurveyBtn.disabled = true; // Deshabilita el botón
    showSurveyBtn.textContent = 'Encuesta Completada'; // Cambia el texto del botón

    this.reset();  
});

