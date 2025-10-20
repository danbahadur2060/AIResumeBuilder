export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-indigo-50 to-white border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Resume Builder</h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Create professional, job-winning resumes in minutes with our AI-powered builder — optimized for every industry.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
            <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Stay Updated</h4>
          <p className="mt-4 text-sm text-gray-600">Subscribe to get updates, tips, and AI resume insights.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 px-6 max-w-6xl mx-auto">
        <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:text-indigo-600 transition">Twitter</a>
          <a href="#" className="hover:text-indigo-600 transition">LinkedIn</a>
          <a href="#" className="hover:text-indigo-600 transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}