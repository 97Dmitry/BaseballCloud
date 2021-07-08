import { FC } from "react";
import { Footer } from "views/components/Footer";
import { Header } from "views/components/Header";

const App: FC = () => {
  return (
    <div>
      <Header />
      <p>Text</p>
      <Footer />
    </div>
  );
};

export default App;
