document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clienteForm');
    const clienteList = document.getElementById('clienteList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;

        const response = await fetch('/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, telefono }),
        });

        if (response.ok) {
            const cliente = await response.json();
            // Añadir el nuevo cliente a la lista con la fecha y hora de registro
            const li = document.createElement('li');
            li.textContent = `${cliente.nombre} - ${cliente.telefono} - Fecha: ${new Date(cliente.fechaRegistro).toLocaleDateString()} - Hora: ${cliente.horaRegistro}`;
            clienteList.appendChild(li);
            form.reset();
        } else {
            console.error('Error al agregar el cliente');
        }
    });

    async function loadClientes() {
        const response = await fetch('/clientes');
        if (response.ok) {
            const clientes = await response.json();
            clienteList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos clientes
            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `${cliente.nombre} - ${cliente.telefono} - Fecha: ${new Date(cliente.fechaRegistro).toLocaleDateString()} - Hora: ${cliente.horaRegistro}`;
                clienteList.appendChild(li);
            });
        } else {
            console.error('Error al cargar los clientes');
        }
    }

    loadClientes(); // Cargar clientes al cargar la página
});
