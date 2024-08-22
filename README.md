# Exhibition Curator Project

## Description

The Exhibition Curator Project is a platform that allows users to curate personalized art exhibitions. Users can search for artworks using key terms or preset options, select their preferred pieces, and add them to a custom exhibition. Each exhibition includes images and detailed information about the selected artworks, with navigation options and links to further resources.

## Installation

1. Clone the repository.
2. Install dependencies:

   ```
   npm install
   ```

3. Set up the Supabase backend:

   - Sign up for a Supabase account.
   - Create a new project and set up your database tables.
   - Obtain your Supabase API keys and add them to your .env file:

     ```
     VITE_SUPABASE_URL=your-supabase-url
     ```

     ```
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

## Run the development server:

```
npm run dev
```

## Usage

- Login/Register: Users must create an account or log in to use the platform. Authentication is handled via Supabase.
- Search and Filter Artworks: Users can search for and filter artworks based on provided criteria.
- Temporary Collection: Artworks can be saved to a temporary collection for further exploration.
- Artwork Details: Detailed information about each artwork is displayed when selected.
- Create an Exhibition: Users can curate their own exhibitions, which persist during their session.
