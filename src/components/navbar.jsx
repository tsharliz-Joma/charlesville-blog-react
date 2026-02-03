import {useEffect, useRef, uesState} from "react";



<nav className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
  <div>
    <p className="text-xs uppercase tracking-[0.35em] text-steel">
      Charlesville
    </p>
    <p className="font-display text-lg text-haze">Game Dev Journal</p>
  </div>
  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-steel">
    <a href="#posts" className="hover:text-haze transition-colors">
      Posts
    </a>
    <a href="#about" className="hover:text-haze transition-colors">
      About
    </a>
    <a href="#subscribe" className="hover:text-haze transition-colors">
      Subscribe
    </a>
  </div>
  <button
    type="button"
    onClick={onToggleTheme}
    className="inline-flex items-center gap-2 rounded-full border border-slate bg-smoke/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-fog backdrop-blur hover:text-haze hover:border-haze transition"
    aria-label="Toggle color theme">
    {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
    <span className="hidden sm:inline">
      {theme === "light" ? "Night" : "Day"}
    </span>
  </button>
</nav>;
