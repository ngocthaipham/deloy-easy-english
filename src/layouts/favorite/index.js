import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SuiBox from "components/SuiBox";
import FavoriteCourse from "layouts/favorite/components/FavoriteCourse";

function Favorite() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <FavoriteCourse />
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Favorite;
