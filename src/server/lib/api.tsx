export async function getAllProducts() {
  const response = await fetch(`/api/items`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return response.json();
}

export async function getProductById(id: string | number) {
  const response = await fetch(`/api/items/${encodeURIComponent(String(id))}`);
  if (!response.ok) {
    throw new Error(`No se encontró ningún producto con este id: ${id}`);
  }
  return response.json();
}