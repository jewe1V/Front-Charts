export const TableBase = ({data}) => {
    const isValidArray = Array.isArray(data);

    return (
        <div>
            <table border="1" style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
                <thead>
                <tr>
                    <th>Годы</th>
                    {isValidArray &&
                        data.map((element) => (
                            <th key={element.published_at__year}>{element.published_at__year}</th>
                        ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Количество вакансий</td>
                    {isValidArray &&
                        data.map((element) => (
                            <td key={element.published_at__year}>{element.count}</td>
                        ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}