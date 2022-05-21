import './table.scss'
import Button from "../button/button";
import {useEffect, useState} from "react";
import downloadSVG from '../utils/download.svg';
import Input from "../input/input";

const Table = ( {headers = [], data = [], paginated = false, download = false, editableColumns = [], onEditTable})  => {

    const [displayData, setDisplayData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(!paginated)
            setDisplayData(data);
        else
            setDisplayData(data.slice((page - 1) * 4, page * 4));
    }, [page, paginated, data]);

    const onPrevious = () => {
        setPage(page - 1);
    }

    const onNext = () => {
        setPage(page + 1);
    }

    const classes = `
        table
        ${ download ? 'table-download' : '' }
    `;

    const renderPagination = () => (
        <div className="pagination">
            <Button
                disabled={ page === 1 }
                active={false}
                variant={"normal"}
                color={"blue"}
                value="&lt;"
                action={onPrevious}
            />
            <div className="pagination-number">Pagina {page}/{ data.length % 4 === 0 ? data.length / 4 : Math.trunc(data.length / 4 + 1) }</div>
            <Button
                disabled={ page === (data.length % 4 === 0 ? data.length / 4 : Math.trunc(data.length / 4 + 1)) }
                active={false}
                variant={"normal"}
                color={"blue"}
                value="&gt;"
                action={onNext}
            />
        </div>
    );

    return (
        <div className="wrapper">
            <table className={classes}>
              <thead className={"table-head"}>
                  { headers.map((value) => <th>{value}</th>) }
              </thead>
              <tbody className={"table-body"}>
                  { displayData.map((set, line) => (
                      <tr key={line}>
                          { set.map((value, index) => (
                              <td key={index}>
                              {editableColumns.includes(index) ?
                                    <Input
                                        type="text"
                                        value={value}
                                        variant={"medium"}
                                        onEdit={(newValue) => onEditTable(page, index, line, newValue)}
                                    />
                                    :
                                    value
                              }
                              </td>
                          ))}
                          { download ? <Button variant="icon" value={downloadSVG} /> : ''}
                      </tr>
                  ))}
              </tbody>
            </table>
            {paginated ? renderPagination() : ''}
        </div>
    );

}

export default Table;
