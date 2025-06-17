import { argv } from "process";

//hacemos la destructuracion, las dos primeras comas es para los dos primeros parametros, despues ponemos el metodo (get, post, delete), despues vamos a seguimos con el resto de los parametros, sea uno, dos o mas
const [, , method, resource, ...params] = argv;

//hacemos un if y comparamos que el metodo sea lo mismo que GET y que resource sea lo mismo que products, si el caso es afirmativo en tra en el if, en el curpo del if tenemos una constante que se llama response que recibe la api a consultar y otra constante que recibe la primera constante como .json, luego de eso hacemos un log del .json
if (method == "GET" && resource == "products")
{
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
}

if (method == "GET" && argv[3].startsWith("products/"))
{
  try {
    const response = await fetch("https://fakestoreapi.com/" + argv[3]);
    const data = await response.json();
    console.log(data);    
  } catch (error) {
    console.error(error);
  }
}

//realizamos el metodo POST, donde en la constante de products en el precio lo hacemos con parsefloat para que me transforme el precio en un numero, sino me lo toma como string
if (method == "POST" && argv[3] == "products")
{
  const product = {
    title: params[0],
    price: parseFloat(argv[5]),
    category: argv[6],
  }

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

//metodo DELETE

if (method == "DELETE" && argv[3].startsWith("products/"))
{
  fetch("https://fakestoreapi.com/" + argv[3], {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}