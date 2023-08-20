## About

- **Register and Login:** Create an account or log in using Firebase Authentication.
- **View Articles:** Browse through the list of articles and click on links to view full articles.
- **Add to Wishlist:** Add articles to your wishlist for later reference.
- **View Wishlist:** Access your wishlist to see your saved articles.


### Fetching and Setup

1. **Clone the Project:** To get started, clone the project from the Git repository:
### Fetching and Setup

1. **Clone the Project:** To get started, clone the project from the Git repository:
git clone https://github.com/yourusername/your-project-name.git


2. **Setup Project:** Navigate to the project directory and install dependencies:
cd your-project-name
npm install


3. **Start the Project:** Run the following command to start the project:
npm run start

### Authentication

Authentication is done using Firebase Authentication. Users can sign up, log in, and manage their accounts securely.

### Wishlist and Firebase Integration
**Wishlist Integration:**
Due to the lack of unique IDs from the API, a workaround has been implemented:

 The project uses Redux Toolkit to manage user context, containing user information and wishlist details, which is used to store in firebasse firestore to enable wishlist functionality

 **Article Marking:** Due to the lack of unique IDs from the API, articles cannot be uniquely marked as added to the wishlist when viewing them.


## Contact

For questions or feedback, feel free to reach out to [s.kishore123.64@gmail.com].

