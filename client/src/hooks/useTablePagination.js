import { useMemo, useState } from 'react';

export const useTablePagination = (dataSource = [], initialPageSize = 5) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const paginatedData = useMemo(() => {
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        return dataSource.slice(start, end);
    }, [current, pageSize, dataSource]);

    const paginationConfig = {
        current,
        pageSize,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
        },
    };

    return {
        paginatedData,
        paginationConfig,
    };
};
