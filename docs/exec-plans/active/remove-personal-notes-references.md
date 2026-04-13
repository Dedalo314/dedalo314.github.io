# Execution Plan: Remove References to Personal Notes in Blog Posts

The goal of this task is to remove any mentions of "personal notes" in the blog posts, making the content self-contained or citing real external references.

## Objectives
- Identify and eliminate all references to personal notes in the blog posts.
- Ensure the blog posts are self-contained or provide citations to external sources.
- Verify the changes do not break the narrative or correctness of the posts.

## Tasks
1. **Identify References:** Review all files in `src/content/blog/` for any mentions of "personal notes", "my notes", etc.
2. **Update `src/content/blog/relativistic-rocket.mdx`:**
   - Remove the reference to "Calculus Nightmare" mentioned in "my notes" (line 56).
   - Update the reference to "My notes confirm that" (line 94) to be more self-contained or use an external reference.
   - (Optional) Review the narrative in line 11 to see if it should be more objective.
3. **Review other blog posts:** Ensure no other references are present in `src/content/blog/agent-harness-implementation.mdx` or other files.
4. **Verification:**
   - Run a grep to confirm no more references to "notes" remain.
   - Verify that the updated sentences still make sense and are mathematically/physically correct.

## Verification Steps
- `grep -r "notes" src/content/blog/` should return only relevant, non-"personal notes" results (e.g., footnotes, if any, or general mentions if appropriate).
- Ensure the posts still provide a clear and complete explanation.
