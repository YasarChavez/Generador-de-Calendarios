// script.js

// Establecer los valores predeterminados del mes y año
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    document.getElementById('month').value = currentDate.getMonth() + 1; // getMonth() devuelve el mes desde 0 (Enero)
    document.getElementById('year').value = currentDate.getFullYear(); // Año actual
});

// Generar el calendario al enviar el formulario
document.getElementById('calendarForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    if (!month || !year) {
        calendarDiv.innerHTML = '<p>Por favor, ingresa un mes y un año válidos.</p>';
        return;
    }

    generateCalendar(month, year, calendarDiv);
});

function generateCalendar(month, year, calendarDiv) {
    const firstDay = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let calendarHTML = `<h2>${monthNames[month - 1]} ${year}</h2>`;
    calendarHTML += '<table><tr>';

    // Días de la semana
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    daysOfWeek.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });
    calendarHTML += '</tr><tr>';

    // Espacios en blanco antes del primer día
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarHTML += '<td></td>';
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<td>${day}</td>`;
        if ((day + firstDay.getDay()) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
    }

    // Cerrar tabla
    calendarHTML += '</tr></table>';
    calendarDiv.innerHTML = calendarHTML;

    // Mostrar el botón de copiar
    document.getElementById('copyButton').style.display = 'block';
}

document.getElementById('copyButton').addEventListener('click', function() {
    const calendarDiv = document.getElementById('calendar');
    const range = document.createRange();
    range.selectNode(calendarDiv);
    
    const selection = window.getSelection();
    selection.removeAllRanges(); // Limpiar las selecciones anteriores
    selection.addRange(range); // Seleccionar el contenido del calendario

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Calendario copiado al portapapeles!' : 'No se pudo copiar el calendario.';
        alert(msg);
    } catch (err) {
        console.error('Error al intentar copiar el calendario: ', err);
    }

    // Limpiar la selección
    selection.removeAllRanges();
});
