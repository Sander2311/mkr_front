import './App.css';
import { Registration } from './pages/Registration';

function App() {
  return (
    <>
      <Registration />
      {/* <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:name" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/user-info/:id" element={<User />} />
        </Routes>
      </Container> */}
    </>
  );
}

export default App;
