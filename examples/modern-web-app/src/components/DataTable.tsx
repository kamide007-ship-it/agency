import React, { memo, useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DataRow {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

interface DataTableProps {
  theme: 'light' | 'dark';
}

// Virtual scrolling configuration
const ITEM_HEIGHT = 56; // 56px per row
const VISIBLE_ITEMS = 10;
const BUFFER_ITEMS = 2;

// Generate sample data
const generateSampleData = (): DataRow[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
    joinDate: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString(),
  }));
};

const DataTable = memo<DataTableProps>(({ theme }) => {
  const data = useMemo(() => generateSampleData(), []);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleStart = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleEnd = visibleStart + VISIBLE_ITEMS;
  const offsetStart = Math.max(0, visibleStart - BUFFER_ITEMS);
  const offsetEnd = Math.min(data.length, visibleEnd + BUFFER_ITEMS);

  // Get visible items with buffer
  const visibleItems = useMemo(() => {
    return data.slice(offsetStart, offsetEnd);
  }, [data, offsetStart, offsetEnd]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      const scrollAmount = ITEM_HEIGHT * 3;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          containerRef.current.scrollTop += scrollAmount;
          break;
        case 'ArrowUp':
          e.preventDefault();
          containerRef.current.scrollTop -= scrollAmount;
          break;
        case 'End':
          e.preventDefault();
          containerRef.current.scrollTop = data.length * ITEM_HEIGHT;
          break;
        case 'Home':
          e.preventDefault();
          containerRef.current.scrollTop = 0;
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [data.length]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-labelledby="table-title"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="table-title"
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          User Directory
        </h2>

        <p className="text-sm mb-4 italic">
          Tip: Use arrow keys, Home, and End to navigate the virtualized table
        </p>

        {/* Table Container with Virtual Scrolling */}
        <div
          className={`border rounded-lg overflow-hidden ${
            theme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
          }`}
        >
          {/* Header - Fixed */}
          <div
            className={`sticky top-0 z-10 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-100 border-gray-200'
            } border-b`}
          >
            <table className="w-full" role="presentation">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    scope="col"
                    aria-sort="none"
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    scope="col"
                    aria-sort="none"
                  >
                    Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    scope="col"
                    aria-sort="none"
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    scope="col"
                    aria-sort="none"
                  >
                    Join Date
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Virtual Scroll Container */}
          <div
            ref={containerRef}
            className="relative overflow-y-auto"
            style={{
              height: `${VISIBLE_ITEMS * ITEM_HEIGHT}px`,
            }}
            role="region"
            aria-label="User data table"
            aria-live="polite"
            tabIndex={0}
          >
            {/* Spacer for top */}
            <div
              style={{
                height: `${offsetStart * ITEM_HEIGHT}px`,
              }}
              aria-hidden="true"
            />

            {/* Visible Items */}
            <table
              className="w-full"
              role="grid"
              aria-rowcount={data.length}
              aria-colcount={4}
            >
              <tbody>
                {visibleItems.map((row, index) => {
                  const actualIndex = offsetStart + index;
                  return (
                    <motion.tr
                      key={row.id}
                      className={`border-t transition-colors ${
                        theme === 'dark'
                          ? 'border-gray-700 hover:bg-gray-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: (index % 5) * 0.05,
                      }}
                      role="row"
                      aria-rowindex={actualIndex + 2}
                    >
                      <td className="px-6 py-3 text-sm font-medium">
                        {row.name}
                      </td>
                      <td
                        className={`px-6 py-3 text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        <a
                          href={`mailto:${row.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {row.email}
                        </a>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            row.status
                          )}`}
                          role="status"
                          aria-label={`Status: ${row.status}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-3 text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {row.joinDate}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {/* Spacer for bottom */}
            <div
              style={{
                height: `${Math.max(0, (data.length - offsetEnd) * ITEM_HEIGHT)}px`,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Footer with info */}
          <div
            className={`px-6 py-4 text-sm ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-400'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            } border-t`}
          >
            Showing {Math.min(visibleEnd, data.length)} of {data.length} users
          </div>
        </div>

        {/* Accessibility Notice */}
        <div
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
          role="note"
        >
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Accessible Features:</strong> This table uses virtual scrolling
            for performance, semantic table markup for screen readers, keyboard
            navigation (Arrow keys, Home, End), and ARIA live regions for status
            updates.
          </p>
        </div>
      </div>
    </motion.section>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;
