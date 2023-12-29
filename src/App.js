import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";

function App() {
  const data = [
    {
      id: 1,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
    {
      id: 2,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
    {
      id: 3,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
    {
      id: 4,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
    {
      id: 5,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
    {
      id: 6,
      titulo: "Auto",
      imag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvHkWzcsl_EQHkrrioxIGqZtolfnRr4CdcA&usqp=CAU",
      text: "Características",
      url: "/#"
    },
  ]
  return (
    <div>
      <Navbar />
      <div className="container">
        <Jumbotron />
        <div className="row row-cols-1 row-cols-md-3 g-3 my-3">
          {data.map((element, index) => {
            return <div className="col" key={element.id}>
              <Card imagen={element.imag} title={element.titulo} text={element.text} url={element.url} />
            </div>
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}



export default App;