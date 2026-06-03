import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthenticatedLayout, ModulePlaceholder } from '../components/AuthenticatedLayout'
import { LoginPage, RegisterPage } from '../../features/auth'
import { useAuthSession } from '../../features/auth/hooks/useAuthSession'
import { LecturasPage, NuevaLecturaPage } from '../../features/lecturas'
import { SociosPage } from '../../features/socios'

export function AppRouter() {
  const { isAuthenticated } = useAuthSession()

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/lecturas" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/lecturas" replace /> : <RegisterPage />} />
      <Route element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<ModulePlaceholder title="Dashboard" />} />
        <Route path="/socios" element={<SociosPage />} />
        <Route path="/medidores" element={<ModulePlaceholder title="Medidores" />} />
        <Route path="/lecturas" element={<LecturasPage />} />
        <Route path="/lecturas/nueva" element={<NuevaLecturaPage />} />
        <Route path="/facturacion" element={<ModulePlaceholder title="Facturacion" />} />
        <Route path="/comunidad" element={<ModulePlaceholder title="Comunidad" />} />
        <Route path="/reportes" element={<ModulePlaceholder title="Reportes" />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
