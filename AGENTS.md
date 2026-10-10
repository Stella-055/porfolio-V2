<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep portfolio content in `src/data/portfolio.ts` and render it through focused portfolio components so personal details remain easy to update.
- Keep the About section in its own portfolio component with data-driven interest panels so its interactions and personal content stay isolated from the rest of the page.
- Use the shared element-local useParallax hook for scroll depth; reduce travel on compact screens and disable it for reduced motion to preserve native scrolling and readable layouts.
- Keep Focus in a dedicated component with data-driven practice tabs and SVG system diagrams so each practice remains keyboard-accessible and its content easy to update.
