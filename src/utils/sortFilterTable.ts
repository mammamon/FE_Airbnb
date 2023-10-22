export const sortFilterTable = (definitions, data) => {
    return definitions.map((definition) => ({
        ...definition,
        sorter: definition.sorter || ((a, b) => String(a[definition.dataIndex]).localeCompare(String(b[definition.dataIndex]))),
        filters: definition.filters || [...new Set(data.map(item => item[definition.dataIndex]))].map(value => ({ text: String(value), value: String(value) })),
        onFilter: definition.onFilter || ((value, record) => String(record[definition.dataIndex]).includes(value)),
    }));
};
