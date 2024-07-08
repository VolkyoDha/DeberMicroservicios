document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productoForm');
    const productoList = document.getElementById('productoList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;

        const response = await fetch('/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, precio }),
        });

        if (response.ok) {
            const producto = await response.json();
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            productoList.appendChild(li);
            form.reset();
        } else {
            console.error('Error al agregar el producto');
        }
    });

    async function loadProductos() {
        const response = await fetch('/productos');
        if (response.ok) {
            const productos = await response.json();
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - $${producto.precio}`;
                productoList.appendChild(li);
            });
        } else {
            console.error('Error al cargar los productos');
        }
    }

    loadProductos();
});
