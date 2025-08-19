// Servicio de Fake Store API
import fetch from "node-fetch";

const apiUrl = "https://fakestoreapi.com/products";
const listSeller = ["OCEANEEKJFN ARGENTINA", "SKY- VISION", "MULTIGARDEN MA", "GROWSBEE", "MERCADO - COL", "ARCHI SA",    ]; 
const conditions = ["Nuevo", "Usado"];

// Caché en memoria con TTL configurable por variables de entorno
const PRODUCTS_TTL_MS = Number.parseInt(process.env.PRODUCTS_TTL_MS ?? "300000", 10);  // 5 min
const DETAIL_TTL_MS = Number.parseInt(process.env.DETAIL_TTL_MS ?? "600000", 10); // 10 min


let productsCache = null;
let productsCacheTs = 0;

const detailCache = new Map(); 
 

export async function getProducts() {
  if (productsCache && Date.now() - productsCacheTs < PRODUCTS_TTL_MS) {
    console.log("Retornando desde caché");
    return productsCache;
  }
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Error en Fake Store API");
    }
 
    const json = await response.json();
    const randomBoolean = () => Math.random() >= 0.5;

    const onlyProduct = {
      categories: [...new Set(json.map((product) => product.category))],
      items: json.map((product) => ({
        id: product.id,
        title: product.title,
        seller: listSeller[Math.floor(Math.random() * listSeller.length)],
        price: {
          currency: "USD",
          amount: product.price,
          decimals: 2,
          regular_amount: null,
        },
        picture: product.image,
        free_shipping: randomBoolean(),
        installments: Math.floor(Math.random() * 8) + 3,
      })),
    };

    productsCache = onlyProduct;
    productsCacheTs = Date.now();
    return onlyProduct;
}

export async function getProductDetail(id) {
  const cacheKey = String(id);
  const cached = detailCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < DETAIL_TTL_MS) {
    return cached.data;
  }
  const response = await fetch(`${apiUrl}/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Error en Fake Store API (status ${response.status})`);
  }

  let product;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      product = await response.json();
    } catch {
      return null;
    }
  } else {
    const text = await response.text();
    try {
      product = JSON.parse(text);
    } catch {
      return null;
    }
  }

  if (!product || typeof product !== 'object') {
    return null;
  }

  const data = {
    id: product.id,
    title: product.title,
    seller: listSeller[Math.floor(Math.random() * listSeller.length)], 
    price: {
      currency: "USD",
      amount: product.price,
      decimals: 2,
      regular_amount: null
    },
    picture: product.image,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    free_shipping: Math.random() >= 0.5,
    installments: Math.floor(Math.random() * 8) + 3,
    sold: Math.floor(Math.random() * 100),
    category: product.category,
    description: product.description,
  };

  detailCache.set(cacheKey, { data, ts: Date.now() });
  return data;
}