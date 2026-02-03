# Charlesville Blog (React + Shadcn/UI)

This project is a simple blog built with **React** and **Vite**.  It uses
[Tailwind CSS](https://tailwindcss.com/) for utility‑first styling and
hand‑rolled components inspired by the [shadcn/ui](https://ui.shadcn.com) design
system.  Content is managed through **Netlify CMS**, which stores posts in
Markdown files within the repository.

## Getting started

1. **Install dependencies**

   Make sure you have a recent version of Node.js (18 or later) installed.
   Then install the project dependencies:

   ```bash
   npm install
   ```

2. **Run the development server**

   Start the Vite development server with:

   ```bash
   npm run dev
   ```

   The site will be served at `http://localhost:5173`.  Any changes you
   make to the source files will reload the page automatically.

3. **Build for production**

   To generate a production build, run:

   ```bash
   npm run build
   ```

   The built files will be output to the `dist` directory.  This is the
   directory you should tell Netlify to publish.

4. **Content management**

   Netlify CMS lives under the `/admin` route.  Once you deploy this site to
   Netlify and enable Identity and Git Gateway, you’ll be able to log in at
   `/admin` and create/edit blog posts.  Posts are saved under
   `public/posts` as Markdown files with front matter.  The post list is
   generated from `public/posts/index.json`.

## Structure

- `index.html` – Entry point used by Vite to mount the React app.
- `src/` – Application code.
  - `App.jsx` – Sets up the router and defines page routes.
  - `main.jsx` – Entry point that mounts the React application.
  - `index.css` – TailwindCSS directives and custom styles.
  - `components/ui/card.jsx` – A simple Card component inspired by shadcn/ui.
  - `pages/Home.jsx` – Displays the list of posts.
  - `pages/Post.jsx` – Renders individual posts from Markdown.
- `public/` – Static assets and Netlify CMS files.
  - `posts/index.json` – A listing of all posts (generated manually or via CMS).
  - `posts/*.md` – Individual post files written in Markdown.
  - `admin/index.html` – Loads the Netlify CMS app.
  - `admin/config.yml` – Configuration for Netlify CMS.

## Customising the design

The site’s look and feel comes from TailwindCSS and our custom Card component.
To tweak colours or fonts, edit `tailwind.config.js` and adjust the
`extend.colors` section.  You can also customise any of the components in
`src/components/ui` or add new ones that suit your style.

## Deploying to Netlify

1. **Create a new site** on Netlify and connect it to your repository.
2. Set the **build command** to `npm run build` and the **publish directory**
   to `dist`.
3. Enable **Netlify Identity** and **Git Gateway** in your site settings to
   allow CMS login and commits.  Consult the Netlify documentation for
   detailed setup instructions.

Once deployed, you can visit `/admin` on your site to log into the CMS.
