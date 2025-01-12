import React, { useState } from 'react';
import './ReusableTable.css';

const ReusableTable = ({ columns, data, displayedColumns }) => {
  const [filters, setFilters] = useState(
    columns.reduce((acc, column) => {
      const columnType = column.type || 'string';
      acc[column.key] = columnType === 'numeric' ? { min: '', max: '' } : '';
      return acc;
    }, {})
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Default to showing all columns if displayedColumns is not provided
  const visibleColumns = displayedColumns?.length ? displayedColumns : columns.map((col) => col.key);

  // Derive tooltip columns (hidden columns)
  const tooltipColumns = columns.filter((column) => !visibleColumns.includes(column.key));

  const handleStringFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleNumericFilterChange = (key, field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        [field]: value,
      },
    }));
  };

  const filteredData = data.filter((row) =>
    columns.every((column) => {
      const value = row[column.key];
      const columnType = column.type || 'string';

      if (columnType === 'string') {
        return value?.toString().toLowerCase().includes(filters[column.key]?.toLowerCase());
      }

      if (columnType === 'numeric') {
        const { min, max } = filters[column.key];
        const numericValue = parseFloat(value);
        const minValid = min === '' || numericValue >= parseFloat(min);
        const maxValid = max === '' || numericValue <= parseFloat(max);
        return minValid && maxValid;
      }

      return true;
    })
  );

  return (
    <div className="table-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button onClick={() => setIsSidebarOpen(false)}>Close Filters</button>
        <div>
          {columns.map((column) => (
            <div key={column.key} className="filter">
              <label>{column.label}:</label>
              {(!column.type || column.type === 'string') && (
                <input
                  type="text"
                  placeholder={`Filter ${column.label}`}
                  value={filters[column.key]}
                  onChange={(e) => handleStringFilterChange(column.key, e.target.value)}
                />
              )}
              {column.type === 'numeric' && (
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters[column.key].min}
                    onChange={(e) =>
                      handleNumericFilterChange(column.key, 'min', e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters[column.key].max}
                    onChange={(e) =>
                      handleNumericFilterChange(column.key, 'max', e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              setFilters(
                columns.reduce((acc, column) => {
                  const columnType = column.type || 'string';
                  acc[column.key] = columnType === 'numeric' ? { min: '', max: '' } : '';
                  return acc;
                }, {})
              );
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <button onClick={() => setIsSidebarOpen(true)}>Open Filters</button>
        <table className="table">
          <thead>
            <tr>
              {visibleColumns.map((columnKey) => {
                const column = columns.find((col) => col.key === columnKey);
                return <th key={column.key}>{column.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id || index}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className="row-hover"
              >
                {/* Render visible columns */}
                {visibleColumns.map((columnKey) => {
                  const column = columns.find((col) => col.key === columnKey);
                  return <td key={column.key}>{row[column.key]}</td>;
                })}

                {/* Tooltip for hidden columns */}
                {hoveredRow === index && tooltipColumns.length > 0 && (
                  <div className="tooltip">
                    {tooltipColumns.map((col) => (
                      <div key={col.key}>
                        <strong>{col.label}:</strong> {row[col.key]}
                      </div>
                    ))}
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
