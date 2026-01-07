document.addEventListener('DOMContentLoaded', function() {
    // Animación de fade-in para las imágenes
    const images = document.querySelectorAll('.section-image, .header-image');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease-in-out';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Si la imagen ya está cargada
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Lazy loading para mejor rendimiento
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('visible');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Función para el cuestionario (ya existente en el HTML inline)
function evaluarQuizJava() {
    const respuestasCorrectas = {
        p1: 'b', p2: 'b', p3: 'b', p4: 'b', p5: 'b',
        p6: 'c', p7: 'b', p8: 'b', p9: 'b', p10: 'b'
    };
    
    let correctas = 0;
    let total = Object.keys(respuestasCorrectas).length;
    
    for (let pregunta in respuestasCorrectas) {
        const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
        if (respuesta && respuesta.value === respuestasCorrectas[pregunta]) {
            correctas++;
        }
    }
    
    const resultado = document.getElementById('resultado-java');
    resultado.style.display = 'block';
    resultado.innerHTML = `<strong>Resultado:</strong> ${correctas} de ${total} respuestas correctas (${Math.round(correctas/total*100)}%)`;
    
    if (correctas === total) {
        resultado.innerHTML += '<br>¡Excelente! Dominas los conceptos.';
        resultado.style.background = '#d4edda';
    } else if (correctas >= total * 0.7) {
        resultado.innerHTML += '<br>¡Bien! Sigue repasando.';
        resultado.style.background = '#fff3cd';
    } else {
        resultado.innerHTML += '<br>Revisa los temas y vuelve a intentarlo.';
        resultado.style.background = '#f8d7da';
    }
}

function reiniciarQuizJava() {
    document.getElementById('quiz-java').reset();
    document.getElementById('resultado-java').style.display = 'none';
}
