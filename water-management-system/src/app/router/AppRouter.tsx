import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthenticatedLayout, ModulePlaceholder } from '../components/AuthenticatedLayout'
import { LoginPage, RegisterPage } from '../../features/auth'
import { useAuthSession } from '../../features/auth/hooks/useAuthSession'
import { LecturasPage, NuevaLecturaPage } from '../../features/lecturas'
import { NuevoSocioPage, SociosPage } from '../../features/socios';
import { EditarSocioPage } from '../../features/socios/pages/EditarSocioPage';
import { MedidoresPage, NewMeterPage } from '../../features/medidores';

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
        <Route path="/socios/nuevo" element={<NuevoSocioPage />} />
        <Route path="/medidores" element={<MedidoresPage />} />
        <Route path="/medidores/nuevo" element={<NewMeterPage />} />
        <Route path="/lecturas" element={<LecturasPage />} />
        <Route path="/lecturas/nueva" element={<NuevaLecturaPage />} />
        <Route path="/facturacion" element={<ModulePlaceholder title="Facturacion" />} />
        <Route path="/comunidad" element={<ModulePlaceholder title="Comunidad" />} />
        <Route path="/reportes" element={<ModulePlaceholder title="Reportes" />} />
        <Route path="/socios/:id/editar" element={<EditarSocioPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
