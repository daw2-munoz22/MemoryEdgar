import Header from "./components/Header";
import { ClicksProvider } from "./context/ClicksContext";

export default function App() {
  return (
    
    <ClicksProvider>
      <div>
        <Header />
      </div>
    </ClicksProvider>
  )
}