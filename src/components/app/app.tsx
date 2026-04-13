import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  AppHeader,
  Modal,
  ProtectedRoute,
  IngredientDetails,
  OrderInfo
} from '@components';
import { Preloader } from '@ui';
import '../../index.css';
import styles from './app.module.css';

interface LocationState {
  backgroundLocation?: ReturnType<typeof useLocation>;
}

const ModalOrderInfo = () => {
  const navigate = useNavigate();
  return (
    <Modal title='Детали заказа' onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};

const ModalIngredientDetails = () => {
  const navigate = useNavigate();
  return (
    <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  );
};

const AppContent = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;
  const location = useLocation() as ReturnType<typeof useLocation>;
  const state = location.state as LocationState | null;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <Routes location={state?.backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}

      {/* Модальные маршруты */}
      <Routes>
        <Route path='/feed/:number' element={<ModalOrderInfo />} />
        <Route path='/ingredients/:id' element={<ModalIngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <ModalOrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
