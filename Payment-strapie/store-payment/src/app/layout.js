import './globals.css';

export const metadata = {
  title: 'Payment App',
  description: 'A Next.js app with Stripe payment integration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex flex-col">

        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-8 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight animate-fade-in">Payment App</h1>
            <nav className="space-x-6">
              <a href="/" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200" > Home </a>
              <a href="/products" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200" > Products </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto w-full p-6">{children}</main>

        <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Payment App. All rights reserved.</p>
          </div>
        </footer>
        
      </body>
    </html>
  );
}