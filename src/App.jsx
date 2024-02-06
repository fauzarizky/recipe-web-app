import { Route, Routes } from "react-router-dom";
import { Homepage } from "./page/Homepage";
import { NotFound } from "./page/NotFound";
import { DatasDetail } from "./page/DatasDetail";
import { Profile } from "./page/Profile";
import { ListMenuBySelectedType } from "./page/ListMenuBySelectedType";
import { Bookmark } from "./page/Bookmark";
import { Like } from "./page/Like";
import { SingleMenu } from "./page/SingleMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/categories" element={<DatasDetail data={"categories"} />}></Route>
      <Route path="/ingredients" element={<DatasDetail data={"ingredients"} />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/bookmark" element={<Bookmark />}></Route>
      <Route path="/like" element={<Like />}></Route>
      <Route path="/categories/:category" element={<ListMenuBySelectedType filterBy={"category"} />}></Route>
      <Route path="/ingredients/:ingredient" element={<ListMenuBySelectedType filterBy={"ingredients"} />}></Route>
      <Route path="/menu/:name" element={<SingleMenu />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
