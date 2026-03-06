import { useState, useEffect } from "react";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api";

const EMPTY_FORM = {
  name: "",
  company: "",
  age: "",
  role: "",
  email: "",
  phone: "",
};

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = async (id) => {
    try {
      const emp = await getEmployee(id);
      setEditingId(id);
      setForm({
        name: emp.name || "",
        company: emp.company || "",
        age: emp.age || "",
        role: emp.role || "",
        email: emp.email || "",
        phone: emp.phone || "",
      });
      setFormError("");
      setModalOpen(true);
    } catch {
      showToast("Error al cargar el empleado.", "error");
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setFormError("El nombre es obligatorio.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        showToast("Empleado actualizado correctamente.");
      } else {
        await createEmployee(form);
        showToast("Empleado creado correctamente.");
      }
      setModalOpen(false);
      fetchEmployees();
    } catch {
      setFormError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      showToast("Empleado eliminado.", "error");
      setDeleteConfirm(null);
      fetchEmployees();
    } catch {
      showToast("Error al eliminar el empleado.", "error");
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.role?.toLowerCase().includes(search.toLowerCase()) ||
      e.company?.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name) =>
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  const avatarColor = (name) => {
    const colors = [
      "#E07B54", "#5C9EAD", "#A8C686", "#C47DB5", "#E8A838",
      "#5B7FA6", "#D4726A", "#6BAA8C",
    ];
    let hash = 0;
    for (let c of (name || "")) hash = c.charCodeAt(0) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0F0F0F; }

        .em-root {
          min-height: 100vh;
          background: #0F0F0F;
          color: #F0EDE8;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
        }

        .em-header {
          border-bottom: 1px solid #1E1E1E;
          padding: 28px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0F0F0F;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .em-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .em-brand-icon {
          width: 36px; height: 36px;
          background: #E07B54;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #0F0F0F;
        }

        .em-brand-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        .em-brand-sub {
          font-size: 12px;
          color: #555;
          font-weight: 300;
          margin-top: 1px;
        }

        .em-btn-add {
          background: #E07B54;
          color: #0F0F0F;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: background 0.15s, transform 0.1s;
        }
        .em-btn-add:hover { background: #C96B44; transform: translateY(-1px); }

        .em-body { padding: 40px 48px; max-width: 1300px; margin: 0 auto; }

        .em-stats {
          display: flex; gap: 20px; margin-bottom: 36px;
        }

        .em-stat {
          background: #161616;
          border: 1px solid #1E1E1E;
          border-radius: 12px;
          padding: 20px 28px;
          flex: 1;
        }

        .em-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #E07B54;
          line-height: 1;
        }

        .em-stat-label {
          font-size: 12px;
          color: #666;
          margin-top: 6px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .em-controls {
          display: flex; gap: 16px; margin-bottom: 28px; align-items: center;
        }

        .em-search-wrap {
          flex: 1;
          position: relative;
        }

        .em-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #555;
        }

        .em-search {
          width: 100%;
          background: #161616;
          border: 1px solid #2A2A2A;
          color: #F0EDE8;
          padding: 11px 14px 11px 40px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .em-search:focus { border-color: #E07B54; }
        .em-search::placeholder { color: #444; }

        .em-count {
          color: #555; font-size: 13px; white-space: nowrap;
        }

        .em-table-wrap {
          background: #161616;
          border: 1px solid #1E1E1E;
          border-radius: 14px;
          overflow: hidden;
        }

        .em-table {
          width: 100%;
          border-collapse: collapse;
        }

        .em-table th {
          background: #111;
          color: #555;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 14px 20px;
          text-align: left;
          border-bottom: 1px solid #1E1E1E;
          font-family: 'DM Sans', sans-serif;
        }

        .em-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #1A1A1A;
          font-size: 14px;
          vertical-align: middle;
        }

        .em-table tr:last-child td { border-bottom: none; }

        .em-table tr:hover td { background: #1A1A1A; }

        .em-avatar {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #0F0F0F;
          flex-shrink: 0;
        }

        .em-name-cell {
          display: flex; align-items: center; gap: 12px;
        }

        .em-name { font-weight: 500; color: #F0EDE8; }
        .em-email { font-size: 12px; color: #555; margin-top: 2px; }

        .em-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          background: #1E1E1E;
          color: #AAA;
          border: 1px solid #2A2A2A;
        }

        .em-actions { display: flex; gap: 8px; }

        .em-btn-icon {
          width: 32px; height: 32px;
          border: 1px solid #2A2A2A;
          background: transparent;
          color: #666;
          border-radius: 7px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          font-size: 14px;
        }
        .em-btn-icon:hover.edit { border-color: #E07B54; color: #E07B54; background: #E07B541A; }
        .em-btn-icon:hover.del { border-color: #E05454; color: #E05454; background: #E054541A; }

        .em-empty {
          text-align: center;
          padding: 80px 20px;
          color: #444;
        }
        .em-empty-icon { font-size: 48px; margin-bottom: 16px; }
        .em-empty-title { font-family: 'Syne', sans-serif; font-size: 20px; color: #333; margin-bottom: 8px; }

        /* Modal */
        .em-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.15s ease;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .em-modal {
          background: #161616;
          border: 1px solid #2A2A2A;
          border-radius: 16px;
          width: 100%; max-width: 520px;
          padding: 36px;
          animation: slideUp 0.2s ease;
        }

        .em-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px;
        }

        .em-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
        }

        .em-modal-close {
          width: 32px; height: 32px;
          background: #1E1E1E; border: none; color: #666;
          border-radius: 8px; cursor: pointer;
          font-size: 18px; display: flex; align-items: center; justify-content: center;
          transition: color 0.15s;
        }
        .em-modal-close:hover { color: #F0EDE8; }

        .em-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .em-field { display: flex; flex-direction: column; gap: 6px; }
        .em-field.full { grid-column: 1 / -1; }

        .em-label {
          font-size: 11px; color: #666;
          text-transform: uppercase; letter-spacing: 1px; font-weight: 500;
        }

        .em-input {
          background: #111;
          border: 1px solid #2A2A2A;
          color: #F0EDE8;
          padding: 11px 14px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .em-input:focus { border-color: #E07B54; }
        .em-input::placeholder { color: #333; }

        .em-form-error {
          color: #E05454; font-size: 13px;
          padding: 10px 14px;
          background: #E054541A;
          border: 1px solid #E054542A;
          border-radius: 8px;
          margin-top: 8px;
        }

        .em-modal-footer {
          display: flex; justify-content: flex-end; gap: 12px; margin-top: 28px;
        }

        .em-btn-cancel {
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #666;
          padding: 10px 20px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .em-btn-cancel:hover { border-color: #444; color: #AAA; }

        .em-btn-save {
          background: #E07B54;
          border: none;
          color: #0F0F0F;
          padding: 10px 22px;
          border-radius: 8px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
          min-width: 110px;
        }
        .em-btn-save:hover { background: #C96B44; }
        .em-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Delete confirm */
        .em-del-modal {
          background: #161616;
          border: 1px solid #2A2A2A;
          border-radius: 16px;
          padding: 36px;
          max-width: 400px;
          width: 100%;
          animation: slideUp 0.2s ease;
          text-align: center;
        }
        .em-del-icon { font-size: 40px; margin-bottom: 16px; }
        .em-del-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700;
          margin-bottom: 10px;
        }
        .em-del-sub { color: #666; font-size: 14px; margin-bottom: 28px; }
        .em-del-name { color: #F0EDE8; font-weight: 500; }

        .em-btn-del {
          background: #E05454; border: none; color: #FFF;
          padding: 10px 22px; border-radius: 8px;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: background 0.15s;
        }
        .em-btn-del:hover { background: #C04444; }

        /* Toast */
        .em-toast {
          position: fixed; bottom: 28px; right: 28px;
          background: #1E1E1E;
          border: 1px solid #2A2A2A;
          color: #F0EDE8;
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 14px;
          z-index: 999;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          animation: slideUp 0.2s ease;
          max-width: 320px;
        }
        .em-toast.success { border-left: 3px solid #6BAA8C; }
        .em-toast.error { border-left: 3px solid #E05454; }

        .em-loading {
          display: flex; align-items: center; justify-content: center;
          padding: 80px; color: #333; font-size: 14px; gap: 12px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .em-spinner {
          width: 20px; height: 20px;
          border: 2px solid #2A2A2A;
          border-top-color: #E07B54;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 768px) {
          .em-header { padding: 20px 20px; }
          .em-body { padding: 24px 20px; }
          .em-stats { flex-direction: column; }
          .em-grid { grid-template-columns: 1fr; }
          .em-table { font-size: 13px; }
          .em-table th, .em-table td { padding: 12px 14px; }
        }
      `}</style>

      <div className="em-root">
        {/* Header */}
        <header className="em-header">
          <div className="em-brand">
            <div className="em-brand-icon">EM</div>
            <div>
              <div className="em-brand-title">Employee Manager</div>
              <div className="em-brand-sub">Panel de gestión de personal</div>
            </div>
          </div>
          <button className="em-btn-add" onClick={openCreate}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
            Nuevo Empleado
          </button>
        </header>

        <div className="em-body">
          {/* Stats */}
          <div className="em-stats">
            <div className="em-stat">
              <div className="em-stat-num">{employees.length}</div>
              <div className="em-stat-label">Total Empleados</div>
            </div>
            <div className="em-stat">
              <div className="em-stat-num">
                {[...new Set(employees.map((e) => e.company).filter(Boolean))].length}
              </div>
              <div className="em-stat-label">Empresas</div>
            </div>
            <div className="em-stat">
              <div className="em-stat-num">
                {[...new Set(employees.map((e) => e.role).filter(Boolean))].length}
              </div>
              <div className="em-stat-label">Roles distintos</div>
            </div>
          </div>

          {/* Controls */}
          <div className="em-controls">
            <div className="em-search-wrap">
              <span className="em-search-icon">🔍</span>
              <input
                className="em-search"
                placeholder="Buscar por nombre, rol o empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className="em-count">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Table */}
          <div className="em-table-wrap">
            {loading ? (
              <div className="em-loading">
                <div className="em-spinner" />
                Cargando empleados...
              </div>
            ) : error ? (
              <div className="em-empty">
                <div className="em-empty-icon">⚠️</div>
                <div className="em-empty-title">Error de conexión</div>
                <div>{error}</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="em-empty">
                <div className="em-empty-icon">👤</div>
                <div className="em-empty-title">
                  {search ? "Sin resultados" : "Sin empleados"}
                </div>
                <div>
                  {search
                    ? "Prueba con otro término de búsqueda"
                    : "Agrega tu primer empleado con el botón superior"}
                </div>
              </div>
            ) : (
              <table className="em-table">
                <thead>
                  <tr>
                    <th>Empleado</th>
                    <th>Empresa</th>
                    <th>Rol</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <div className="em-name-cell">
                          <div
                            className="em-avatar"
                            style={{ background: avatarColor(emp.name) }}
                          >
                            {initials(emp.name)}
                          </div>
                          <div>
                            <div className="em-name">{emp.name}</div>
                            <div className="em-email">{emp.email || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#AAA" }}>{emp.company || "—"}</td>
                      <td>
                        {emp.role ? (
                          <span className="em-badge">{emp.role}</span>
                        ) : "—"}
                      </td>
                      <td style={{ color: "#AAA" }}>{emp.age || "—"}</td>
                      <td style={{ color: "#AAA" }}>{emp.phone || "—"}</td>
                      <td>
                        <div className="em-actions">
                          <button
                            className="em-btn-icon edit"
                            title="Editar"
                            onClick={() => openEdit(emp.id)}
                          >✏️</button>
                          <button
                            className="em-btn-icon del"
                            title="Eliminar"
                            onClick={() => setDeleteConfirm(emp)}
                          >🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="em-overlay" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="em-modal">
            <div className="em-modal-header">
              <div className="em-modal-title">
                {editingId ? "Editar Empleado" : "Nuevo Empleado"}
              </div>
              <button className="em-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>

            <div className="em-grid">
              <div className="em-field full">
                <label className="em-label">Nombre *</label>
                <input
                  className="em-input"
                  placeholder="Ej. María García"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="em-field">
                <label className="em-label">Empresa</label>
                <input
                  className="em-input"
                  placeholder="Ej. Acme Corp"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="em-field">
                <label className="em-label">Edad</label>
                <input
                  className="em-input"
                  type="number"
                  placeholder="Ej. 28"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div className="em-field full">
                <label className="em-label">Rol / Puesto</label>
                <input
                  className="em-input"
                  placeholder="Ej. Desarrollador Frontend"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="em-field">
                <label className="em-label">Email</label>
                <input
                  className="em-input"
                  type="email"
                  placeholder="correo@empresa.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="em-field">
                <label className="em-label">Teléfono</label>
                <input
                  className="em-input"
                  placeholder="Ej. +52 81 1234 5678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            {formError && <div className="em-form-error">{formError}</div>}

            <div className="em-modal-footer">
              <button className="em-btn-cancel" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button
                className="em-btn-save"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear Empleado"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="em-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div className="em-del-modal">
            <div className="em-del-icon">⚠️</div>
            <div className="em-del-title">¿Eliminar empleado?</div>
            <div className="em-del-sub">
              Se eliminará permanentemente a{" "}
              <span className="em-del-name">{deleteConfirm.name}</span>.
              Esta acción no se puede deshacer.
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="em-btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button className="em-btn-del" onClick={() => handleDelete(deleteConfirm.id)}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`em-toast ${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "🗑️"}</span>
          {toast.msg}
        </div>
      )}
    </>
  );
}
