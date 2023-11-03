import { Button } from "@konj-org/react-ui";

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center gap-12 flex-col">
      <h1 className="text-5xl uppercase font-semibold text-primary-600 dark:text-primary-300">
        @konj-org/react-ui
      </h1>
      <Button color="primary" component="a" href="https://ui.konj.org">
        Open Docs
      </Button>
    </div>
  );
}

export default App;
