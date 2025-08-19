# Search Product – README

Proyecto full‑stack de **Next.js (App Router)** + **Express** que implementa un buscador y detalle de productos, sirviendo un **API interno** que a su vez consume **Fake Store API**, el Front está sobre **React** + **Next.js**.

> **Nota sobre el enunciado:** Por requerimiento, **NO** se usa la API de Mercado Libre. Se utiliza **[https://fakestoreapi.com/](https://fakestoreapi.com/)**. Como esa API no provee información de algunos datos como `free_shipping`, `condition`, `installments`,`sold`  dichos valores se **simulan o se fijan**.

---

##  Demo local rápida

```bash

# 1) Desarrollo
npm install
# Front en http://localhost:5173  (ajusta si tu proyecto usa 3000)

npm run dev

```

---

## Requisitos

* Node.js **>= 20** 
* npm 

---

## Variables de entorno

Crea **.env.local** (desarrollo): 
(La aplicación tiene una validación por si este archivo no existe)

```bash
# URL base del mismo host donde corren Next + API Express
NEXT_PUBLIC_BASE_URL=http://localhost:5173

# TTLs de caché en memoria para respuestas del servicio Fake Store
PRODUCTS_TTL_MS=300000   # 5 minutos
DETAIL_TTL_MS=600000     # 10 minutos
```

---

Author: Tatiana Méndez