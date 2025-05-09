# 🌱 Gestión de Almacenaje y Distribución de Cacao 🍫

## 🎯 Objetivo del Proyecto

Este sistema tiene como finalidad **optimizar el almacenamiento, apilamiento y transporte del cacao** en una finca productora. A través de un control eficiente de bultos, pilas y cargas, se facilita el proceso de envío y se mejora la trazabilidad de la producción.

---

## 🏗️ Características Principales

### 📦 Almacenaje y Apilamiento
- Ingreso manual de la **cantidad de cacao (kg)** por bulto.
- Organización del cacao en **pilas por bloques** para facilitar su manejo.

### 🧮 Control de Pilas
- Registro automático del **total de cacao en cada pila**.
- Seguimiento en **tiempo real** del inventario almacenado.

### 🚛 Descarga y Transporte
- Generación de reporte con:
  - 🏋️‍♂️ Peso por costal
  - 📦 Número de costales listos para transporte
- Visualización del total de cacao listo para ser cargado en el camión.

---

## 🖥️ Tecnologías Utilizadas

### 🎨 Frontend
- **React + JavaScript**
- Funcionalidades:
  - Formulario para ingreso de cacao por bulto
  - Visualización de pilas e inventario
  - Reporte de carga disponible para transporte

### 🧠 Backend
- **Node.js (Express)**
- Funcionalidades:
  - API REST para gestionar bultos, pilas y reportes
  - Cálculo del total por pila y número de costales
  - Generación de reportes de apilado y transporte

---

## 🧠 Algoritmo de Cálculo

- Calcula el **número de costales necesarios** según el peso por costal.
- Lleva un **seguimiento detallado** desde el apilamiento hasta la distribución.
- Garantiza **trazabilidad y eficiencia** mediante reportes automáticos.

---

## ⚙️ Instalación y Ejecución

### 🔽 Clona el repositorio
```bash
git clone https://github.com/tuusuario/gestion-cacao.git
cd gestion-cacao
