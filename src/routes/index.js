import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import Publishers from "../views/Publisher.vue";
import Readers from "../views/Reader.vue";
import BookBorrowingTrack from "../views/BookBorrowingTrack.vue";
import Employees from "../views/Employees.vue";

import NotFound from "../views/NotFound.vue";

import BookDetails from "../components/BookDetails.vue";
import PublisherDetails from "../components/PublisherDetails.vue";
import ReaderDetails from "../components/ReaderDetails.vue";
import TheoDoiMuonSachDetail from "../components/TheoDoiMuonSachDetail.vue";
import NhanVienDetail from "../components/NhanVienDetail.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/books", component: Books },
    { path: "/publishers", component: Publishers },
    { path: "/readers", component: Readers },
    { path: "/trackingList", component: BookBorrowingTrack },
    { path: "/employeeList", component: Employees },
   
    { path: "/books/:MaSach", name: "BookDetails", component: BookDetails }, 
    { path: "/publishers/:MaNXB", name: "PublisherDetails", component: PublisherDetails },
    { path: "/readers/:MaDocGia", name: "ReaderDetail", component: ReaderDetails },
    { path: "/trackingList/:MaDocGia/:MaSach", name: "TheoDoiMuonSachDetail", component: TheoDoiMuonSachDetail },
    { path: "/employeeList/:msnv", name: "NhanVienDetail", component: NhanVienDetail },

    { path: "/:pathMatch(.*)*", component: NotFound }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
