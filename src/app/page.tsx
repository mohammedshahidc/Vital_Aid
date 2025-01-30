import Footer from "@/components/ui/footer";
import Homepage from "@/components/users/Home/home";
import Landinav from "@/components/users/Navbar/landingNav";


export default function Home() {
  return (
    <div>
      <Landinav/>
      <Homepage />
      <Footer/>
    </div>
  );
}
