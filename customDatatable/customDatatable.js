import { LightningElement, api, track } from 'lwc';

export default class CustomDatatable extends LightningElement {
    // Propiedades recibidas
    @api columns;
    @track sortedBy;
    @track sortDirection = 'asc'; // O 'desc'
    @track filteredData = [];
    // Inicialización segura de _records como un array vacío
    _records = [];

    // Datos filtrados para mostrar en la datatable
    filteredData = [];

    // Observador para detectar cambios en los records proporcionados y filtrar inicialmente
    @api
    get records() {
        return this._records;
    }

    set records(value) {
        this._records = Array.isArray(value) ? value : [];
        this.filteredData = [...this._records]; // Inicialmente, muestra todos los datos
    }

    // Manejador para el evento de cambio en el campo de búsqueda
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
    
        // Primero, filtra los datos
        this.filteredData = this._records.filter(record =>
            Object.keys(record).some(key =>
                String(record[key]).toLowerCase().includes(searchTerm)
            )
        );
    
        // Luego, aplica el ordenamiento actual a los datos filtrados
        this.filteredData = this.sortData(this.sortedBy, this.sortDirection);
    }
    

    // Función para manejar el ordenamiento
    updateSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        this.sortedBy = sortedBy;
        this.sortDirection = sortDirection;
        this.filteredData = this.sortData(sortedBy, sortDirection);
    }

    // Función para ordenar los datos
    sortData(fieldName, sortDirection) {
        const parseData = JSON.parse(JSON.stringify(this.filteredData));
        const keyValue = (a) => {
            return a[fieldName];
        };

        const isReverse = sortDirection === 'asc' ? 1 : -1;

        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // Para manejar nulls
            y = keyValue(y) ? keyValue(y) : ''; // Para manejar nulls

            // Soporte básico para números y strings
            return isReverse * ((x > y) - (y > x));
        });

        return parseData;
    }
}
