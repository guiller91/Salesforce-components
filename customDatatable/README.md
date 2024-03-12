# Searchable Datatable LWC

El componente `Searchable Datatable LWC` es un Lightning Web Component diseñado para proporcionar una solución eficiente y fácil de usar para mostrar datos en forma de tabla con una característica de búsqueda integrada. Este componente es ideal para desarrolladores de Salesforce que buscan implementar una funcionalidad de filtrado dinámico en sus aplicaciones Lightning, sin necesidad de codificación adicional.

## 🚀 Características

- **Búsqueda Dinámica**: Permite a los usuarios filtrar los datos de la tabla en tiempo real, mejorando la experiencia del usuario al buscar registros específicos.
- **Ordenamiento de Columnas**: Soporta el ordenamiento de datos haciendo clic en los encabezados de las columnas, ofreciendo una forma intuitiva de organizar los resultados.
- **Fácil Integración**: Diseñado para ser integrado fácilmente en cualquier proyecto LWC, con mínima configuración requerida.
- **Personalizable**: Permite al desarrollador especificar las columnas y los datos a mostrar, brindando flexibilidad en la presentación de la información.

## 📌 Uso

Para integrar y utilizar el `Searchable Datatable LWC` en tu componente LWC, necesitarás definir los datos (registros) y la configuración de las columnas que deseas mostrar. A continuación, se describe cómo puedes hacerlo:

### Datos (Records)

El componente acepta un array de objetos, donde cada objeto representa un registro en la tabla. Cada clave en el objeto debe corresponder a un `fieldName` definido en la configuración de las columnas.

```javascript
const records = [
    { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
    { id: '2', name: 'Jane Doe', email: 'janedoe@example.com' }
];

```

### Configuración de las Columnas

Las columnas se definen mediante un array de objetos, donde cada objeto especifica las propiedades de una columna, como el label, el fieldName, y el type.

```javascript
const columns = [
    { label: 'ID', fieldName: 'id', type: 'text' },
    { label: 'Name', fieldName: 'name', type: 'text' },
    { label: 'Email', fieldName: 'email', type: 'email' }
];

```
### Implementación en un Componente LWC

Una vez definidos los records y las columns, puedes pasarlos al componente Searchable Datatable LWC utilizando atributos.

```html
<c-searchable-datatable records="{records}" columns="{columns}"></c-searchable-datatable>

```
## 🎨 Personalización
El componente ha sido diseñado con la flexibilidad en mente. Aunque ofrece funcionalidades listas para usar, los desarrolladores pueden extender y personalizar el componente según sus necesidades específicas.
