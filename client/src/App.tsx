import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Navbar from "./components/Navbar";
import { cn } from "./lib/utils"; // Temporary test to verify if the utils.ts file is resolved correctly.

// Simple placeholder pages for demonstration
function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

function About() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Page</h1>
      <p>This is the about page.</p>
    </div>
  );
}

function Projects() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects Page</h1>
      <p>View my projects here.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Page</h1>
      <p>Contact me here.</p>
    </div>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24"> {/* Add margin top to account for the fixed navbar */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
