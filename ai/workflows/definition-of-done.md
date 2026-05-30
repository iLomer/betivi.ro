# Definition of Done — betivi

Every task must meet these criteria before moving to done.

## Universal Checks
- [ ] All acceptance criteria for the task are met and manually verified
- [ ] No TypeScript errors (`npm run type-check` exits with code 0)
- [ ] No ESLint errors or warnings (`npm run lint` exits with code 0)
- [ ] `npm run build` completes successfully with no build-time errors
- [ ] No hardcoded secrets, credentials, or `.env` values committed to the repository
- [ ] Code reviewed by at least one other team member before merge

## Stack-Specific Checks
- [ ] All new Supabase tables have RLS enabled and appropriate policies defined and tested
- [ ] Server components use the server-side Supabase client; client components use the browser client
- [ ] New pages are verified on mobile viewport (375px width) in Chrome DevTools before marking done
- [ ] Vercel preview deployment builds successfully for the feature branch with no runtime errors
- [ ] Any new environment variables are added to both `.env.example` and Vercel project settings
