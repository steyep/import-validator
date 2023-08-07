import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { read, utils } from 'xlsx';
import styles from './importer.module.scss';

type Rows = string[][]
type Headers = [string, (((s: string | number) => Boolean) | null)?][]

const validateRequired = (value: string | number): Boolean => !!value

const Importer = () => {
  const [renderCount, setRenderCount] = useState<number>(0);
  const [rows, setRows] = useState<Rows>([]);
  const [headers, setHeaders] = useState<Headers>([]);

  useEffect(() => {
    setHeaders((rows?.[0] ?? []).map((header) => [header]))
  }, [rows])


  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event?.target?.result ?? ''
        if (result) {
          const wb = read(result);
          const sheets = wb.SheetNames;
          if (sheets.length) {
            const rows: Rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
              header: 1
            });
            setRows(rows)
          }
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const handleValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.id)
    if (event.target.checked) {
      headers[id][1] = validateRequired
    } else {
      delete headers[id][1]
    }
    setHeaders(headers)
    setRenderCount(renderCount + 1)
  }

  return (
    <Container>
      <Form className={styles.importerForm}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              type="file"
              placeholder="File"
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Form.Group>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Select User ID Field</option>
              {headers.map(([header], index) =>
                <option key={`user-field-${index}`} value={index}>{header}</option>
              )}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formRequiredFields">
            <Form.Label>Required Fields:</Form.Label>
            {headers.length > 0 && headers.map(([header], index) =>
              <Form.Check
                type='checkbox'
                id={`${index}`}
                key={`header-${index}`}
                label={header}
                onChange={handleValidate}
              />)
            }
          </Form.Group>
        </Row>
      </Form>
      <Row>
        {rows.length > 1 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                {headers.map(([cell, callback], index) =>
                  <th className={callback ? styles.required : ''} key={`header-${index}`}>{cell}</th>
                )}
              </tr>
            </thead>
            <tbody className={'' + renderCount}>
              {rows.slice(1).map((cells, row) =>
                <tr key={`cell-${row}`}>
                  {cells.map((cell, index) => {
                    const callback = headers?.[index]?.[1] ?? null
                    let cellClass = ''
                    if (callback && !callback(cell)) {
                      cellClass = styles.invalid
                    }
                    return <td className={cellClass} key={`cell-${row}-${index}`}>{cell}</td>
                  })}
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
}

export default Importer