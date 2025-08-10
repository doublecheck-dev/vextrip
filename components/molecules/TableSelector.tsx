interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
}

interface TableSelectorProps {
  selectedTable: string;
  availableTables: Table[];
  tableId?: string;
  tableName?: string;
  onTableChange: (tableId: string) => void;
  onClearSelection: () => void;
}

export default function TableSelector({
  selectedTable,
  availableTables,
  tableId,
  tableName,
  onTableChange,
  onClearSelection
}: TableSelectorProps) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        🍽️ Mesa asignada
      </label>
      {selectedTable && availableTables.length > 0 ? (
        <div className="w-full p-3 bg-blue-50 border border-blue-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-800">
                {(() => {
                  const tableData = availableTables.find(t => t.id === selectedTable);
                  return tableData?.name || tableName || 'Mesa seleccionada';
                })()}
              </p>
              <p className="text-sm text-blue-600">
                {(() => {
                  const tableData = availableTables.find(t => t.id === selectedTable);
                  const location = tableData?.location;
                  const capacity = tableData?.capacity || 4;
                  return `${location ? location + ' • ' : ''}Capacidad: ${capacity} personas`;
                })()}
              </p>
              <p className="text-xs text-blue-500 mt-1">
                ID: {selectedTable}
              </p>
              {tableId && (
                <p className="text-xs text-green-600 mt-1">
                  ✅ Mesa asignada automáticamente desde código QR
                </p>
              )}
            </div>
            {!tableId && (
              <button
                type="button"
                onClick={onClearSelection}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Cambiar mesa
              </button>
            )}
          </div>
        </div>
      ) : (
        <select
          value={selectedTable}
          onChange={(e) => onTableChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          required
          disabled={!!tableId}
        >
          <option value="">Elegir mesa disponible</option>
          {availableTables.map((table) => (
            <option key={table.id} value={table.id}>
              {table.name} {table.location && `- ${table.location}`} (Capacidad: {table.capacity || 4}) - ID: {table.id}
            </option>
          ))}
        </select>
      )}

      {availableTables.length === 0 && !tableId && (
        <p className="text-sm text-gray-500 mt-1">
          No hay mesas configuradas. El administrador debe agregar mesas.
        </p>
      )}
    </div>
  );
}
