# Motivation

I started building this when I was teaching in order to help create questions that can be easily exported to online quiz games commonly used in schools like [Kahoot](https://kahoot.it/), [Quizizz](https://quizizz.com/), [Gimkit](https://www.gimkit.com/), and [Blooket](https://www.blooket.com/). There are certainly others, but these were the ones used more frequently in my school.
The primary issues I had with these sorts of sites was that it locked down the questions you created into a single platform, and that creating questions was tedious through the tools provided. Tedious in the sense that there was too much clicking around through menus. Using the spreadsheets was much quicker, and did allow you to retain your own questions, but question creation was a significant time sink if you wanted quality material.

What I wanted was to be able to upload a PDF or paste in text and have it create questions from that, allowing me to later edit or remove them as I see fit. That’s what this is the start of, though it’s not yet feature complete.

# Current features

The Docker setup is the development version using Supabase for authentication. I am only using Google Auth at the moment, and haven’t set it up for email auth or local use, but plan to do that in the near future.

Here are the current features:

- [x] Social auth via Google (Supabase)
- [x] Question creation from PDF and text
- [x] Can handle multiple files
- [x] Organizing questions by collection
- [x] Generating more questions for existing collections
- [x] Add tags to collections
- [x] Edit question content
- [x] Export to spreadsheet for use in Quizizz

# To do

- [ ] Export for Kahoot
- [ ] Export for Gimkit
- [ ] Export for Blooket
- [ ] Moving questions between Collections
- [ ] Registration using email
- [ ] Toggle for using OpenAI’s ChatGPT-4.0 as well as other models
- [ ] Dark mode
- [ ] Providing real-time feedback on question creation
- [ ] Allowing rerun if creation fails

There are other, long-term features I’d like to add, but this has really been an experiment for me in playing with Supabase and using Tailwind. I’m still deciding how much time I’d like to spend on this going forward.

# Issues

The code is still rough and requires cleaning up, error implementation and testing.

# Setup

Before you run anything you'll need to setup Supabase and have an OpenAI API key. Details will need to be place in an **.env** file which fits the format of **template.env**.

Then clone the repo and use **docker-compose up** to build and run. It should be running at http://localhost:5173 unless you have something else running on that port.

# Stack used

This project uses [SvelteKit](https://kit.svelte.dev/), [Tailwind](https://tailwindcss.com/) and [Supabase](https://supabase.com/).

---

This source code is licensed under the GPL style license found in the
LICENSE file in the root directory of this source tree.
