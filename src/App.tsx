import { RouterProvider } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { router } from "@/router";
import { AppProvider } from "./state";

function App() {
  return (
    <AppProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#5477f4"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        }
      />
    </AppProvider>
  );
}

export default App;
