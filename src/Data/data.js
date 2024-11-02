export const categories = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    return data
  } catch (error) {
    return error.message;
  }
}

export const price = async (item) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${item}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export const local_data = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
}