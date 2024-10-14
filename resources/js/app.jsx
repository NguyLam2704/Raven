import { createRoot } from 'react-dom/client';
// import '../css/app.css';
function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <button class="bg-sky-500 hover:bg-sky-700">Save changes</button>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);