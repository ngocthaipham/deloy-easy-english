/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import AddCourse from "layouts/dashboard/components/ListCourse/AddCourse";
import EditCourse from "layouts/dashboard/components/ListCourse/EditCourse";
import ListLevel from "layouts/dashboard/components/ListLevel/ListLevel";
import AddLevel from "layouts/dashboard/components/ListLevel/AddLevel";
import EditLevel from "layouts/dashboard/components/ListLevel/EditLevel";
import LearnedWord from "layouts/dashboard/components/ListLevel/LearnedWord";
import UnLearnedWord from "layouts/dashboard/components/ListLevel/UnLearnedWord";
import Learn from "layouts/dashboard/components/Learn/Learn";
import ListWord from "layouts/dashboard/components/ListWord/ListWord";
import AddWord from "layouts/dashboard/components/ListWord/AddWord";
import EditWord from "layouts/dashboard/components/ListWord/EditWord";
import SpeedTest from "layouts/dashboard/components/SpeedTest/SpeedTest";
import Tables from "layouts/tables";
import Course from "layouts/tables/components/Course";
import CourseDetail from "layouts/tables/components/CourseDetail";
import Billing from "layouts/billing";
import Favorite from "layouts/favorite";
import Private from "layouts/privateCourse";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
// import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
// import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Explore",
    key: "explore",
    route: "/explore",
    icon: <Office size="12px" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Course",
    key: "Course",
    route: "/explore/:idSource",
    component: Course,
  },
  {
    type: "route",
    name: "CourseDetail",
    key: "CourseDetail",
    route: "/explore/:idSource/:idLevel",
    component: CourseDetail,
  },
  {
    type: "collapse",
    name: "My course",
    key: "myCourse",
    route: "/home",
    icon: <Shop size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "route",
    name: "AddCourse",
    key: "AddCourse",
    route: "/home/course/new",
    component: AddCourse,
  },
  {
    type: "route",
    name: "EditCourse",
    key: "EditCourse",
    route: "/home/course/edit/:idSource/:nameSource/:desSource/:imageSource/0",
    component: EditCourse,
  },
  {
    type: "route",
    name: "LevelList",
    key: "LevelList",
    route: "/home/:idSource/level",
    component: ListLevel,
  },
  {
    type: "route",
    name: "AddLevel",
    key: "AddLevel",
    route: "/home/:idSource/level/new",
    component: AddLevel,
  },
  {
    type: "route",
    name: "EditLevel",
    key: "EditLevel",
    route: "/home/:idSource/level/edit/:idLevel/:level/:imageLevel",
    component: EditLevel,
  },
  {
    type: "route",
    name: "LearnedWord",
    key: "LearnedWord",
    route: "/home/:idSource/level/learned/:idLevel/:level",
    component: LearnedWord,
  },
  {
    type: "route",
    name: "UnLearnedWord",
    key: "UnLearnedWord",
    route: "/home/:idSource/level/unlearned/:idLevel/:level",
    component: UnLearnedWord,
  },
  {
    type: "route",
    name: "Learn",
    key: "Learn",
    route: "/home/:idSource/level/:idLevel/:level/learn",
    component: Learn,
  },
  {
    type: "route",
    name: "WordList",
    key: "WordList",
    route: "/home/:idSource/level/:idLevel/:level/word",
    component: ListWord,
  },
  {
    type: "route",
    name: "AddWord",
    key: "AddWord",
    route: "/home/:idSource/level/:idLevel/:level/word/new",
    component: AddWord,
  },
  {
    type: "route",
    name: "EditWord",
    key: "EditWord",
    route:
    "/home/:idSource/level/:idLevel/:level/word/edit/:id/:vocab/:meaning/:imageWord/:audioWord",
    component: EditWord,
  },
  {
    type: "route",
    name: "SpeedTest",
    key: "SpeedTest",
    route: "/home/:idSource/level/:idLevel/:level/word/speedtest",
    component: SpeedTest,
  },
  {
    type: "collapse",
    name: "Favorite Course",
    key: "Favorite",
    route: "/favorite",
    icon: <Office size="12px" />,
    component: Favorite,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Private Course",
    key: "Private",
    route: "/private",
    icon: <Office size="12px" />,
    component: Private,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: VirtualReality,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: RTL,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account", key: "account" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: Profile,
    noCollapse: true,
  },
];
const unSignInRoute = [
  {
    type: "collapse",
    name: "Explore",
    key: "explore",
    route: "/explore",
    icon: <Office size="12px" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Course",
    key: "Course",
    route: "/explore/:idSource",
    component: Course,
  },
  {
    type: "route",
    name: "CourseDetail",
    key: "CourseDetail",
    route: "/explore/:idSource/:idLevel",
    component: CourseDetail,
  },
  {
    type: "collapse",
    name: "My Course",
    key: "myCourse",
    route: "/home",
    icon: <Shop size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "route",
    name: "AddCourse",
    key: "AddCourse",
    route: "/home/course/new",
    component: AddCourse,
  },
  {
    type: "route",
    name: "EditCourse",
    key: "EditCourse",
    route: "/home/course/edit/:idSource/:nameSource/:desSource/:imageSource/0",
    component: EditCourse,
  },
  {
    type: "route",
    name: "LevelList",
    key: "LevelList",
    route: "/home/:idSource/level",
    component: ListLevel,
  },
  {
    type: "route",
    name: "AddLevel",
    key: "AddLevel",
    route: "/home/:idSource/level/new",
    component: AddLevel,
  },
  {
    type: "route",
    name: "EditLevel",
    key: "EditLevel",
    route: "/home/:idSource/level/edit/:idLevel/:level/:imageLevel",
    component: EditLevel,
  },
  {
    type: "route",
    name: "LearnedWord",
    key: "LearnedWord",
    route: "/home/:idSource/level/learned/:idLevel/:level",
    component: LearnedWord,
  },
  {
    type: "route",
    name: "UnLearnedWord",
    key: "UnLearnedWord",
    route: "/home/:idSource/level/unlearned/:idLevel/:level",
    component: UnLearnedWord,
  },
  {
    type: "route",
    name: "Learn",
    key: "Learn",
    route: "/home/:idSource/level/:idLevel/:level/learn",
    component: Learn,
  },
  {
    type: "route",
    name: "WordList",
    key: "WordList",
    route: "/home/:idSource/level/:idLevel/:level/word",
    component: ListWord,
  },
  {
    type: "route",
    name: "AddWord",
    key: "AddWord",
    route: "/home/:idSource/level/:idLevel/:level/word/new",
    component: AddWord,
  },
  {
    type: "route",
    name: "EditWord",
    key: "EditWord",
    route:
    "/home/:idSource/level/:idLevel/:level/word/edit/:id/:vocab/:meaning/:imageWord/:audioWord",
    component: EditWord,
  },
  {
    type: "route",
    name: "SpeedTest",
    key: "SpeedTest",
    route: "/home/:idSource/level/:idLevel/:level/word/speedtest",
    component: SpeedTest,
  },
  {
    type: "collapse",
    name: "Favorite Course",
    key: "Favorite",
    route: "/favorite",
    icon: <Office size="12px" />,
    component: Favorite,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Private Course",
    key: "Private",
    route: "/private",
    icon: <Office size="12px" />,
    component: Private,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: VirtualReality,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: RTL,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account", key: "account" },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: SignUp,
    noCollapse: true,
  },
];


export default { routes , unSignInRoute };
