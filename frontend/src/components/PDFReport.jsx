import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"

// Estilos mejorados para el PDF con colores
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    backgroundColor: "#D97706",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#FEF3C7",
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 12,
    color: "#FEF3C7",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1F2937",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 5,
    borderLeft: "4 solid #D97706",
  },
  summaryContainer: {
    backgroundColor: "#FEF3C7",
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    border: "2 solid #D97706",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#92400E",
    textAlign: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    width: "30%",
    textAlign: "center",
    border: "1 solid #D97706",
  },
  summaryCardTitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 5,
  },
  summaryCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D97706",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#D97706",
    borderRadius: 8,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#D97706",
    backgroundColor: "#FEF3C7",
    padding: 12,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    padding: 12,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#92400E",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 11,
    color: "#374151",
    textAlign: "center",
  },
  statusActive: {
    color: "#059669",
    fontWeight: "bold",
  },
  statusEmpty: {
    color: "#6B7280",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    border: "1 solid #E5E7EB",
  },
  footerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D97706",
    marginBottom: 5,
  },
  footerText: {
    fontSize: 10,
    color: "#6B7280",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 60,
    color: "#F3F4F6",
    zIndex: -1,
  },
})

// Componente del documento PDF mejorado
const PDFDocument = ({ data, totales }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark}>🍫 TatiSoft</Text>

      {/* Header mejorado */}
      <View style={styles.header}>
        <Text style={styles.title}>🍫 TatiSoft - Reporte de Inventario</Text>
        <Text style={styles.subtitle}>
          Generado el{" "}
          {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text style={styles.companyInfo}>Sistema de Gestión de Cacao - Finca Productora</Text>
      </View>

      {/* Resumen mejorado */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>📊 RESUMEN EJECUTIVO</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>TOTAL PILAS</Text>
            <Text style={styles.summaryCardValue}>{totales.totalPilas}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>TOTAL BULTOS</Text>
            <Text style={styles.summaryCardValue}>{totales.totalBultos}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>PESO TOTAL</Text>
            <Text style={styles.summaryCardValue}>{totales.pesoTotal} kg</Text>
          </View>
        </View>
      </View>

      {/* Tabla mejorada */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 DETALLE POR PILAS</Text>

        <View style={styles.table}>
          {/* Header de la tabla */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>PILA</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>BLOQUE</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>BULTOS</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>PESO (KG)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>ESTADO</Text>
            </View>
          </View>

          {/* Filas de datos */}
          {data.map((pila, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{pila.nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Bloque {pila.bloque}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{pila.total_bultos || 0}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{pila.peso_total || "0.0"}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={[styles.tableCell, (pila.total_bultos || 0) > 0 ? styles.statusActive : styles.statusEmpty]}
                >
                  {(pila.total_bultos || 0) > 0 ? "✅ CON CARGA" : "⚪ VACÍA"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Footer mejorado */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>🍫 TatiSoft - Sistema de Gestión de Cacao</Text>
        <Text style={styles.footerText}>Optimizando el almacenamiento y distribución de cacao | Finca Productora</Text>
        <Text style={styles.footerText}>
          Reporte generado automáticamente - {new Date().toISOString().split("T")[0]}
        </Text>
      </View>
    </Page>
  </Document>
)

// Componente principal para descargar PDF
const PDFReport = ({ data, totales, fileName = "reporte-inventario" }) => {
  return (
    <PDFDownloadLink
      document={<PDFDocument data={data} totales={totales} />}
      fileName={`${fileName}-${new Date().toISOString().split("T")[0]}.pdf`}
      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <>
            <span className="mr-2">⏳</span>
            Generando PDF...
          </>
        ) : (
          <>
            <span className="mr-2">📄</span>
            Descargar PDF
          </>
        )
      }
    </PDFDownloadLink>
  )
}

export default PDFReport
