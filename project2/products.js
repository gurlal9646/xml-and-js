const clientId = `gurlalproductapp-375c7d498f29ae3300b39631b7729a074370341782217559532`;
const clientSecret = `5xs8b7IBmkiiA10SKaTfk5logSqiA9TJ7iMY3cjX`;

const params = new URLSearchParams(window.location.search);

// Get the value of a specific parameter
const locationId = params.get("locationId");
let products = [];
let productName = `Milk`;

//Method to get access token
const getToken = async () => {
  const result = await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials,scope:product.compact",
  });

  const data = await result.json();
  return data.access_token;
};

//Method to get the products
const getProducts = async (token) => {
  const result = await fetch(
    `https://api.kroger.com/v1/products?filter.term=${productName}&filter.locationId=${locationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await result.json();
  return response.data;
};

//Method to load the products
const loadProducts = async () => {
  let token = `eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJndXJsYWxwcm9kdWN0YXBwLTM3NWM3ZDQ5OGYyOWFlMzMwMGIzOTYzMWI3NzI5YTA3NDM3MDM0MTc4MjIxNzU1OTUzMiIsImV4cCI6MTY4MTg1Mzg2NCwiaWF0IjoxNjgxODUyMDU5LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjBiYjhlNDRjLWJjZjktNTgwMy04ZTUzLTc2YjQ1MzZlMTUzNSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjgxODUyMDY0OTA5NjAxNDAzLCJhenAiOiJndXJsYWxwcm9kdWN0YXBwLTM3NWM3ZDQ5OGYyOWFlMzMwMGIzOTYzMWI3NzI5YTA3NDM3MDM0MTc4MjIxNzU1OTUzMiJ9.wmqUuYklkGVPB6js2n55ZFvPFJl4S60l1ITb8Ue6yzjuXUbOIw0GpgsIWg-tYaIVU8OGxYUGTP-6iCv6eo6nx9Tcp773RMC1dgmaZPy8KZo3yUrw5xvVM0crQnVSwBRDnnbzvz6YrVU8LMHA-TfXswKKEhOo45vCMM5xJPuSNFlI4e_nNfIg_GFFoBA5wf7z8uUGpaawX2h9S8yHbrsm_8nop6vEiYGtnvQQQLWNvsRku2XTVQac1qMV0FnkI6u9wtmglUdt4vtqQz6jRCO2jxcdkykVaG8BPKk30ae5vpxyBSVPKnfdT0Ee4Ssykrlr7VLqqDyCUG6j5_U0PxgoJA`; // await getToken();
  products = await getProducts(token);
};

//Method to generate html dynamic html
const renderProducts = (filterTerm) => {
  let source = products;

  if (filterTerm) {
    const term = filterTerm.toLowerCase();
    source = source.filter(({ description }) => {
      return description.toLowerCase().includes(term);
    });
  }
  const list = document.getElementById(`products-list`);
  const html = source.reduce(
    (
      acc,
      { description, brand, images, items: [item], soldBy, countryOrigin }
    ) => {
      const productImage = images
        .filter((x) => x.perspective === `front`)[0]
        .sizes.filter((x) => x.size === `small`)[0].url;
      return (
        acc + `
    <div class="product-card">
      <div class="product-image">
        <img src="${productImage}" alt="Product Image">
      </div>
      <div class="product-details">
        <h3 class="product-name">${description}</h3>
        <p class="product-brand">Brand: ${brand}</p>
        <p class="product-size">Size: ${item.size}</p>
        <p class="product-place">Origin: ${countryOrigin}</p>
        <p class="product-price">$${item.price.regular}</p>
      </div>
    </div>`
      );
    },
    ""
  );
  list.innerHTML = html;
};

loadProducts().then(renderProducts);

const onSubmit = async (event) => {
  event.preventDefault();

  const term = event.target.term.value;
  if (productName != event.target.category.value) {
    productName = event.target.category.value;
    await loadProducts();
  }
  renderProducts(term);
};

const onReset = () => {
  renderProducts();
};

const redirectStores = () => {
  window.location.assign(`/stores.html`);
};
