import { Outlet } from 'react-router-dom'

export default function PrintLayout() {
  return (
    <div className="print-layout">
      <style>
        {`
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none; }
            .print-only { display: block; }
          }
        `}
      </style>
      <div className="no-print">
        <button onClick={() => window.print()} className="fixed top-4 right-4 z-50 px-4 py-2 bg-medical-primary text-white rounded-lg shadow-lg">
          Imprimer
        </button>
      </div>
      <div className="print-container">
        <Outlet />
      </div>
    </div>
  )
}