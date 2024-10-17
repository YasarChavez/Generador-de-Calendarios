document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    document.getElementById('month').value = currentDate.getMonth() + 1;
    document.getElementById('year').value = currentDate.getFullYear();
});

document.getElementById('calendarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateMonthCalendar();
});

document.getElementById('generateYear').addEventListener('click', function() {
    generateYearCalendar();
});

function generateMonthCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    if (!month || !year) {
        calendarDiv.innerHTML = '<p>Por favor, ingresa un mes y un año válidos.</p>';
        return;
    }

    calendarDiv.innerHTML = `
        <h2>Calendario ${year}</h2>
        <div class="single-month">
            ${generateCalendarHTML(month, year)}
        </div>
    `;
    document.getElementById('copyButton').style.display = 'block';
}

function generateYearCalendar() {
    const year = parseInt(document.getElementById('year').value);
    
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    if (!year) {
        calendarDiv.innerHTML = '<p>Por favor, ingresa un año válido.</p>';
        return;
    }

    let yearHTML = `<h2>Calendario ${year}</h2><div class="year-container">`;
    
    for (let quarter = 0; quarter < 4; quarter++) {
        yearHTML += '<div class="quarter">';
        for (let month = 1; month <= 3; month++) {
            const currentMonth = quarter * 3 + month;
            yearHTML += generateCalendarHTML(currentMonth, year);
        }
        yearHTML += '</div>';
    }
    
    yearHTML += '</div>';

    calendarDiv.innerHTML = yearHTML;
    document.getElementById('copyButton').style.display = 'block';
}

function generateCalendarHTML(month, year) {
    const firstDay = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let calendarHTML = `<div class="month-calendar"><h3>${monthNames[month - 1]}</h3>`;
    calendarHTML += '<table><tr>';

    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    daysOfWeek.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });
    calendarHTML += '</tr><tr>';

    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<td>${day}</td>`;
        if ((day + firstDay.getDay()) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
    }

    calendarHTML += '</tr></table></div>';
    return calendarHTML;
}

document.getElementById('copyButton').addEventListener('click', function() {
    const calendarDiv = document.getElementById('calendar');
    const range = document.createRange();
    range.selectNode(calendarDiv);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Calendario copiado al portapapeles!' : 'No se pudo copiar el calendario.';
        alert(msg);
    } catch (err) {
        console.error('Error al intentar copiar el calendario: ', err);
    }

    selection.removeAllRanges();
});
