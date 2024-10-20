#  Challenge Dux Software

### Deploy
- [Challenge](https://dux-challenge-rn8zt8vzi-andrescastrohubs-projects.vercel.app/)

### Tecnologías Utilizadas
- [Figma](https://www.figma.com/design/HjDhupf4ipWvC2el9fqTse/Challange-Dux?node-id=0-1&t=xx4L25ry9xAwmTun-1)
- [Next.js](https://nextjs.org/docs)
- [PrimeReact](https://primereact.org/)
- [PrimeFlex](https://primeflex.org/)

### Iniciar el Proyecto

Para comenzar a trabajar en el proyecto:

```sh
    # Instalar dependencias
    npm install

    # Iniciar el servidor de desarrollo
    npm run dev
 ```

### Aclaraciones 
Desde mi punto de vista, es más escalable que la API que estoy consumiendo se llame a medida que cambio de página. Basado en esta decisión, decidí manejar el paginado y la cantidad de registros a mostrar del lado del cliente.

Por esta razón, en el componente Table.tsx van a encontrar que totalRecords está hardcodeado. Esto se debe a que la API devuelve solamente un array de objetos y no tengo forma de saber la cantidad de registros existentes.

Si bien podría traer todos los datos en un componente SSR, luego recorrerlos para obtener la cantidad de registros y paginar del lado del frontend, no me parecía la solución más escalable.
