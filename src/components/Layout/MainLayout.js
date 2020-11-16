import Header from '../Header/MainHeader'
const MainLayout = ({ children }) => (
    <div>
      <Header />
        {children}
    </div>
  );
  
  export default MainLayout;