# 🏋️‍♂️ GymSite – Front-End (Angular)

Front-End dell’applicazione **GymSite**, una piattaforma e-commerce dedicata alla vendita di prodotti fitness.  
L’interfaccia è sviluppata in **Angular**, completamente responsive, con gestione del carrello in tempo reale, autenticazione JWT, pagine protette, area utente e pannello admin.

---

## 🚀 Tecnologie utilizzate

- **Angular**
- **TypeScript**
- **SCSS**
- **RxJS**
- **Angular Router**
- **HTTP Client**
- **JWT Interceptor**
- **Standalone Components**
- **Reactive Forms**

---

# 🔐 Autenticazione JWT

L’app utilizza un **Token Interceptor** per:

- allegare automaticamente `Authorization: Bearer <token>` a ogni richiesta
- reindirizzare alla login in caso di token scaduto/non valido
- proteggere rotte usando Guards (UserGuard, AdminGuard)

### 📌 Rotte protette

- **User only:** `/profile`, `/orders`, `/checkout`
- **Admin only:** `/admin/**`
- **Public:** login, register, home, prodotti

---

# 🖥️ Funzionalità implementate

## 👤 Autenticazione
- Login
- Registrazione
- Salvataggio token in LocalStorage
- Recupero dati utente dal token
- Rotte diverse per admin/utente

---

## 🛍️ Catalogo prodotti
- Visualizzazione lista prodotti
- Visualizzazione dettaglio
- Filtri base
- Gestione immagini

---

## 🛒 Carrello (real-time)
- Aggiunta/rimozione prodotti
- Modifica quantità
- Calcolo totale dinamico
- Salvataggio stato carrello in localStorage

Servizio chiave: **`cart.service.ts`**

---

## 💳 Checkout
- Riepilogo ordine
- Invio dati al Back-End
- Pulizia carrello al completamento

---

## 📦 Ordini
- Lista ordini utente
- Dettaglio ordine con prodotti
- Stato ordine
- Compatibile con API REST del BE

---

## 🛠️ Area Admin
Gestione prodotti:

- aggiunta/modifica/eliminazione
- anteprima immagine
- dashboard amministratore

Files chiave:

- `admin-product-form.component.ts`
- `admin-products.component.ts`
- `admin-dashboard.component.ts`

---

# 🌐 Comunicazione con il Back-End

Le API sono incapsulate in:

- `gym-api.ts` (wrapper generico)
- `product.service.ts`
- `order.service.ts`
- `auth.service.ts`

Esempio richiesta:

```ts
this.http.get<Product[]>('http://localhost:8080/api/products');
🔧 Configurazione ambiente
Puoi configurare l’URL del Back-End direttamente nei servizi (gym-api.ts).
Consigliato creare file:

Copia codice
environment.ts
environment.prod.ts
▶️ Avvio del progetto
Assicurati di avere:

Node.js

Angular CLI installata (npm install -g @angular/cli)

1️⃣ Installa dipendenze
nginx
Copia codice
npm install
2️⃣ Avvia in modalità sviluppo
nginx
Copia codice
ng serve
