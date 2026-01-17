import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/page.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Reports() {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchSales();
    fetchInventory();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/reports/sales");
      setSales(res.data || []);
    } catch (error) {
      console.error("Failed to fetch sales report", error);
      setSales([]);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await api.get("/reports/inventory");
      setInventory(res.data || []);
    } catch (error) {
      console.error("Failed to fetch inventory report", error);
      setInventory([]);
    }
  };
  const exportExcel = (data, sheetName, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const exportPDF = (data, title, columns) => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);

    const rows = data.map((item) =>
      columns.map((col) => {
        if (col.key.includes(".")) {
          const keys = col.key.split(".");
          let val = item;
          keys.forEach((k) => (val = val ? val[k] : "-"));
          return val ?? "-";
        }
        return item[col.key] ?? "-";
      })
    );

    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`${title}.pdf`);
  };

  const tableStyle = { borderCollapse: "collapse", width: "100%" };
  const thTdStyle = { border: "1px solid #ddd", padding: "8px", textAlign: "left" };

  return (
    <div className="page">
      <h2 className="page-title">Reports</h2>

      <div className="table-card">
        <h3 className="table-title">Sales Report</h3>
        <div style={{ marginBottom: "10px" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => exportExcel(sales, "Sales", "SalesReport.xlsx")}
          >
            Export Excel
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() =>
              exportPDF(sales, "Sales Report", [
                { header: "Product", key: "product.name" },
                { header: "Qty Sold", key: "quantity" },
                { header: "Total", key: "total" },
              ])
            }
          >
            Export PDF
          </button>
        </div>

        {sales.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>No</th>
                <th style={thTdStyle}>Product</th>
                <th style={thTdStyle}>Qty Sold</th>
                <th style={thTdStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={thTdStyle}>{s.product?.name ?? "-"}</td>
                  <td style={thTdStyle}>{s.quantity ?? 0}</td>
                  <td style={thTdStyle}>Rp {(s.total ?? 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No sales data</p>
        )}
      </div>

      <div className="table-card" style={{ marginTop: "20px" }}>
        <h3 className="table-title">Stock Report</h3>
        <div style={{ marginBottom: "10px" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => exportExcel(inventory, "Inventory", "InventoryReport.xlsx")}
          >
            Export Excel
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() =>
              exportPDF(inventory, "Inventory Report", [
                { header: "Product", key: "name" },
                { header: "Stock", key: "stock" },
                { header: "Price", key: "price" },
              ])
            }
          >
            Export PDF
          </button>
        </div>

        {inventory.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>No</th>
                <th style={thTdStyle}>Product</th>
                <th style={thTdStyle}>Stock</th>
                <th style={thTdStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={thTdStyle}>{i.name ?? "-"}</td>
                  <td style={thTdStyle}>{i.stock ?? 0}</td>
                  <td style={thTdStyle}>Rp {(i.price ?? 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No inventory data</p>
        )}
      </div>
    </div>
  );
}
