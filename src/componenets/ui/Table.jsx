

export function Table({ columns = [], data = [] }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#eadede] bg-white shadow-[0_8px_30px_rgba(123,17,19,0.08)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#eadede] bg-[#faf5f5]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#6f4a4b]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[#f0e5e5] transition-all duration-200 last:border-b-0 hover:bg-[#fdf8f8]"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-[#4f3839]"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-sm text-[#9b8585]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}