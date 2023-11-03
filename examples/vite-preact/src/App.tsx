import { Button, DAnchor } from "@konj-org/preact-ui";

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center gap-12 flex-col">
      <h1 className="text-5xl uppercase font-semibold text-primary-600 dark:text-primary-300">
        @konj-org/preact-ui
      </h1>
      <Button color="primary" component={DAnchor} href="https://ui.konj.org">
        Open Docs
      </Button>
    </div>
  );
}

export default App;
