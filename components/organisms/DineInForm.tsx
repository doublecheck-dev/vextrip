import TableSelector from '../molecules/TableSelector';

interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
}

interface DineInFormProps {
  selectedTable: string;
  availableTables: Table[];
  dinnerDuration: string;
  tableId?: string;
  tableName?: string;
  onTableChange: (tableId: string) => void;
  onClearTableSelection: () => void;
}

export default function DineInForm({
  selectedTable,
  availableTables,
  dinnerDuration,
  tableId,
  tableName,
  onTableChange,
  onClearTableSelection
}: DineInFormProps) {
  return (
    <>
      <TableSelector
        selectedTable={selectedTable}
        availableTables={availableTables}
        tableId={tableId}
        tableName={tableName}
        onTableChange={onTableChange}
        onClearSelection={onClearTableSelection}
      />

      <div className="md:col-span-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Información de la reserva</h4>
          <p className="text-blue-700 text-sm mb-2">
            <strong>Duración estimada:</strong> {dinnerDuration} minutos
          </p>
          <p className="text-blue-600 text-xs">
            La mesa será preparada inmediatamente. Puedes extender tu estadía si es necesario.
          </p>
        </div>
      </div>
    </>
  );
}
